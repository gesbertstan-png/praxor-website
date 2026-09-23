import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
import { useRevealObserver } from "../lib/motion";
import { OG_IMAGE } from "../lib/seo";
import { FIRM } from "../lib/site";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { Arrow } from "../components/site/Arrow";
// Page metadata (browser <title>/favicon + social og: tags) committed into the
// repo by the marketplace meta API and read at BUILD time — no runtime fetch.
import appMetaJson from "../app-meta.json";

declare const __HF_DESIGN_INSPECTOR__: boolean;

const DEFAULT_TITLE = "PRAXOR Audit";
const DEFAULT_DESCRIPTION =
  "Cabinet d’expertise comptable et de commissariat aux comptes à Paris 9e : expertise comptable, audit et conseil aux dirigeants.";

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;

// Runs before first paint: enables the reveal states, and falls back to fully
// visible content if the app has not hydrated within 4 s.
const BOOT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!window.__praxorReady){d.classList.remove('js')}},4000)})();`;

function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? DEFAULT_TITLE;
  const description = meta.og_description ?? DEFAULT_DESCRIPTION;

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title },
      { name: "description", content: description },
      { name: "author", content: FIRM.name },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#F5F5F2" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: FIRM.name },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
      ...(meta.og_video_url ? [{ property: "og:video", content: meta.og_video_url }] : []),
    ],
    links: [
      {
        rel: "preload",
        href: "/fonts/instrument-sans-latin-wght-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const,
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [{ children: BOOT_SCRIPT }],
  };
}

function NotFoundComponent() {
  return (
    <section className="page-hero notfound">
      <div className="wrap">
        <p className="mono body-mute" style={{ marginBottom: 32 }}>
          Erreur 404
        </p>
        <h1 className="page-hero__title" style={{ maxWidth: "14ch" }}>
          Cette page n’existe pas ou a été déplacée.
        </h1>
        <div className="hero__ctas" style={{ marginTop: 48 }}>
          <Link to="/" className="cta-solid">
            Retour à l’accueil
            <Arrow />
          </Link>
          <Link to="/contact" className="cta-text">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportHiggsfieldError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <section className="page-hero notfound">
      <div className="wrap">
        <h1 className="page-hero__title" style={{ maxWidth: "14ch" }}>
          Cette page n’a pas pu s’afficher.
        </h1>
        <p className="lead" style={{ marginTop: 32 }}>
          Vous pouvez réessayer, ou nous joindre au {FIRM.phoneDisplay}.
        </p>
        <div className="hero__ctas" style={{ marginTop: 40 }}>
          <button
            type="button"
            className="cta-submit"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Réessayer
          </button>
          <a href="/" className="cta-text">
            Retour à l’accueil
          </a>
        </div>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useRevealObserver(pathname);

  useEffect(() => {
    (window as unknown as { __praxorReady?: boolean }).__praxorReady = true;
  }, []);

  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) {
      return;
    }

    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => {
        installHiggsfieldDesignInspector();
      })
      .catch((error) => {
        reportHiggsfieldError(
          error instanceof Error ? error : new Error("Failed to load design inspector"),
          {
            boundary: "higgsfield_design_inspector_import",
          },
        );
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" tabIndex={-1} style={{ outline: "none" }}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <div className="dark site-footer-wrap">
        <Footer />
      </div>
    </QueryClientProvider>
  );
}


