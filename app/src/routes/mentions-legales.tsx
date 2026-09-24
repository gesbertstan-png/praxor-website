import { Link, createFileRoute } from "@tanstack/react-router";

import { PageHero } from "../components/site/PageHero";
import { pageHead } from "../lib/seo";
import { FIRM, REGULATORY } from "../lib/site";

export const Route = createFileRoute("/mentions-legales")({
  head: () =>
    pageHead({
      title: "Mentions légales | PRAXOR Audit",
      description:
        "Mentions légales du site de PRAXOR Audit, société d’expertise comptable et de commissariat aux comptes, 12 rue du Helder, 75009 Paris.",
      path: "/mentions-legales",
      robots: "index, nofollow",
    }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <>
      <PageHero
        crumb="Mentions légales"
        lines={["Mentions légales"]}
        lead={<p>Informations relatives à l’éditeur du site et à la protection des données personnelles.</p>}
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap grid-12">
          <div className="prose" style={{ gridColumn: "1 / -1", maxWidth: "72ch" }}>
            <h2>Éditeur du site</h2>
            <p>
              Le présent site est édité par {FIRM.legalName}, {FIRM.legalForm} d’expertise comptable et
              de commissariat aux comptes au capital social de {FIRM.capital}, immatriculée au{" "}
              {FIRM.rcs} (SIREN {FIRM.siren}), code APE {FIRM.ape}, créée le {FIRM.foundedLong}.
            </p>
            <p>
              Siège : {FIRM.street}, {FIRM.postalCode} {FIRM.city}. Téléphone : {FIRM.phoneDisplay}.
              E-mail : <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>.
            </p>

            <h2>Réglementation professionnelle</h2>
            <p>
              Société d’expertise comptable inscrite au tableau de l’Ordre des experts-comptables de la
              région Paris Île-de-France.
            </p>
            <p>{REGULATORY.crcc}</p>

            <h2>Hébergement</h2>
            <p>
              Le site est servi par l’infrastructure de Cloudflare, Inc., 101 Townsend Street, San
              Francisco, CA 94107, États-Unis.
            </p>

            <h2>Données personnelles</h2>
            <p>
              Le formulaire de la page <Link to="/contact">Contact</Link> ne transmet ni ne conserve
              aucune donnée : il ouvre votre messagerie avec votre message pré-rempli, que vous restez
              libre d’envoyer.
            </p>
            <p>
              Conformément à la loi « Informatique et Libertés » et au Règlement général sur la
              protection des données, vous disposez d’un droit d’accès, de rectification et de
              suppression des données qui vous concernent. Pour l’exercer, écrivez à{" "}
              <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>.
            </p>

            <h2>Crédits</h2>
            <p>
              Photographies d’illustration générées pour le cabinet. Polices Instrument Sans et IBM
              Plex Mono sous licence SIL Open Font License.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
