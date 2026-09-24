import { createFileRoute } from "@tanstack/react-router";

import { Arrow } from "../components/site/Arrow";
import { ContactBand } from "../components/site/ContactBand";
import { FactsGrid } from "../components/site/Figures";
import { Keep } from "../components/site/Keep";
import { PageHero } from "../components/site/PageHero";
import { Picture } from "../components/site/Picture";
import { StructuredData } from "../components/site/StructuredData";
import { breadcrumbSchema, pageHead } from "../lib/seo";
import { FIRM, REGULATORY, SECTORS } from "../lib/site";

const PATH = "/le-cabinet";

export const Route = createFileRoute("/le-cabinet")({
  head: () =>
    pageHead({
      title: "Le cabinet PRAXOR Audit, experts-comptables à Paris 9e",
      description:
        "PRAXOR Audit, société d’expertise comptable et de commissariat aux comptes créée en 1975, dirigée par trois associés experts-comptables diplômés, à Paris 9e.",
      path: PATH,
    }),
  component: CabinetPage,
});

function CabinetPage() {
  return (
    <>
      <StructuredData
        json={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Le cabinet", path: PATH },
        ])}
      />
      <PageHero
        crumb="Le cabinet"
        lines={["Le cabinet"]}
        lead={
          <p>
            PRAXOR Audit est une société de commissariat aux comptes et d’expertise comptable, créée
            en 1975 et dirigée par trois associés <span className="nowrap">experts-comptables</span>{" "}
            diplômés.
          </p>
        }
        asideLabel="Sur cette page"
        aside={[
          { label: "Repères", href: "#reperes" },
          { label: "Secteurs d’activité", href: "#secteurs" },
          { label: "Identité du cabinet", href: "#identite" },
          { label: "Rejoindre le cabinet", href: "#rejoindre" },
        ]}
      />

      <section id="reperes" className="section" style={{ paddingTop: 0 }} aria-labelledby="presentation-title">
        <div className="wrap grid-12 cabinet-intro">
          <div className="cabinet-intro__body">
            <h2 id="presentation-title" className="heading reveal">
              Sécuriser et développer l’activité de nos clients
            </h2>
            <p className="lead reveal">
              Ses trois associés totalisent plus de soixante ans d’expérience cumulée dans les métiers
              de l’audit, de l’expertise comptable et du conseil. Les professionnels du cabinet sont à
              votre écoute pour vous conseiller et vous aider à développer vos activités en toute
              sécurité.
            </p>
            <p className="body-mute reveal">
              De la société cotée à la PME, le cabinet accompagne tout type de structures, pour des
              missions récurrentes et ponctuelles. Sa valeur ajoutée repose sur l’adaptation de son
              service aux spécificités structurelles, sectorielles et stratégiques de chaque entité.
            </p>
            <FactsGrid />
          </div>
          <div className="cabinet-intro__media reveal-clip">
            <Picture image="facade" sizes="(max-width: 1023px) 100vw, 30vw" />
          </div>
        </div>
      </section>

      <section
        id="secteurs"
        className="section"
        style={{ background: "var(--paper-2)" }}
        aria-labelledby="secteurs-title"
      >
        <div className="wrap">
          <ul className="sectors">
            <li className="sectors__intro reveal">
              <h2 id="secteurs-title" className="heading" style={{ fontSize: "var(--fs-h3)" }}>
                Secteurs d’activité
              </h2>
              <p>Une clientèle aux métiers très différents, dont le cabinet connaît les contraintes.</p>
            </li>
            {SECTORS.map((s, i) => (
              <li key={s.name} className="sector reveal" style={{ ["--d" as string]: `${((i + 1) % 4) * 60}ms` }}>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="identite" className="section dark" aria-labelledby="identite-title">
        <div className="wrap grid-12 split">
          <div className="split__head">
            <h2 id="identite-title" className="heading reveal">
              Identité du cabinet
            </h2>
            <p className="reveal">
              Créée le {FIRM.foundedLong}, PRAXOR Audit exerce la profession d’expert-comptable et de
              commissaire aux comptes.
            </p>
          </div>
          <div className="split__body">
            <dl className="ident reveal">
              <div>
                <dt>Dénomination</dt>
                <dd>{FIRM.legalName}</dd>
              </div>
              <div>
                <dt>Forme juridique</dt>
                <dd>{FIRM.legalForm}</dd>
              </div>
              <div>
                <dt>Création</dt>
                <dd>{FIRM.foundedLong}</dd>
              </div>
              <div>
                <dt>SIREN</dt>
                <dd>{FIRM.siren} (RCS Paris)</dd>
              </div>
              <div>
                <dt>Code APE</dt>
                <dd>{FIRM.ape}</dd>
              </div>
              <div>
                <dt>Activité</dt>
                <dd>{FIRM.activity}</dd>
              </div>
              <div>
                <dt>Siège</dt>
                <dd>
                  {FIRM.street}, {FIRM.postalCode} {FIRM.city}
                </dd>
              </div>
              <div>
                <dt>Inscriptions</dt>
                <dd>
                  <Keep text={REGULATORY.ordre} /> <Keep text={REGULATORY.crcc} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="rejoindre" className="section" aria-labelledby="rejoindre-title">
        <div className="wrap grid-12 split">
          <div className="split__head">
            <h2 id="rejoindre-title" className="heading reveal">
              Rejoindre le cabinet
            </h2>
            <p className="body-mute reveal">
              Les profils recherchés par le cabinet, en expertise comptable et en audit.
            </p>
          </div>
          <div className="split__body">
            <div className="quad reveal">
              <div className="quad__cell">
                <h3>Expertise comptable</h3>
                <p>
                  Collaborateur ou collaboratrice, débutant ou confirmé, de formation comptable (BTS
                  comptabilité et gestion ou DCG), avec une à quatre années d’expérience.
                </p>
              </div>
              <div className="quad__cell">
                <h3>Audit</h3>
                <p>
                  Collaborateur ou collaboratrice débutant, issu d’école de commerce, de l’université
                  (économie et gestion) ou titulaire du DSCG. Aisance rédactionnelle et orale, bonne
                  maîtrise d’Excel.
                </p>
              </div>
            </div>
            <p className="reveal">
              <a className="link-arrow" href={`mailto:${FIRM.email}?subject=Candidature`}>
                Adresser votre candidature à {FIRM.email}
                <Arrow />
              </a>
            </p>
          </div>
        </div>
      </section>

      <ContactBand
        title="Rencontrons-nous, rue du Helder."
        text="Le cabinet vous reçoit au 12 rue du Helder, dans le 9e arrondissement, entre l’Opéra et les Grands Boulevards."
      />
    </>
  );
}
