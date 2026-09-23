import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { applySecurityHeaders } from "./lib/security-headers.server";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// Permanent redirects from the legacy praxor.fr URLs, so existing links and
// search results land on the matching new page once the domain points here.
const LEGACY_REDIRECTS: Record<string, string> = {
  "/fr": "/",
  "/fr/index.html": "/",
  "/index.html": "/",
  "/en/index.html": "/",
  "/fr/societe-praxor.html": "/le-cabinet",
  "/fr/index-clients.html": "/le-cabinet",
  "/fr/expertise-branche.html": "/le-cabinet",
  "/fr/secteur-activite.html": "/le-cabinet",
  "/fr/recrutement-index.html": "/le-cabinet",
  "/fr/index-metiers.html": "/",
  "/fr/expertise-comptable.html": "/expertise-comptable",
  "/fr/expert-social.html": "/expertise-comptable",
  "/fr/expert-fiscal.html": "/expertise-comptable",
  "/fr/expert-juridique.html": "/expertise-comptable",
  "/fr/expert-informatique.html": "/expertise-comptable",
  "/fr/audit-commissariat.html": "/audit-commissariat-aux-comptes",
  "/audit": "/audit-commissariat-aux-comptes",
  "/fr/conseil-praxor.html": "/conseil",
  "/fr/expertise-index.html": "/expertises",
  "/fr/creation-reprise.html": "/expertises#creation-reprise",
  "/fr/due-diligence.html": "/expertises#due-diligence",
  "/fr/controle-interne.html": "/expertises#controle-interne",
  "/fr/pilotage-gestion.html": "/expertises#pilotage-gestion",
  "/fr/transmission-cession.html": "/expertises#transmission-cession",
  "/fr/contact-praxor.html": "/contact",
  "/fr/bureaux.html": "/contact",
  "/fr/plan-acces-praxor.html": "/contact",
  "/fr/mentions-legales.html": "/mentions-legales",
};

function redirect(url: URL, pathname: string): Response {
  const target = new URL(pathname, url.origin);
  return new Response(null, { status: 301, headers: { Location: target.toString() } });
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // One URL per page: strip trailing slashes (before anything else).
      if (url.pathname !== "/" && url.pathname.endsWith("/")) {
        const trimmed = url.pathname.replace(/\/+$/, "");
        const legacy = LEGACY_REDIRECTS[trimmed];
        return applySecurityHeaders(redirect(url, (legacy ?? trimmed) + url.search));
      }
      const legacy = LEGACY_REDIRECTS[url.pathname];
      if (legacy) return applySecurityHeaders(redirect(url, legacy));

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return applySecurityHeaders(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return applySecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
