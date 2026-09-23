import { createFileRoute } from "@tanstack/react-router";

import { ContactBand } from "../components/site/ContactBand";
import { Figures } from "../components/site/Figures";
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
        "PRAXOR Audit, société d’expertise comptable et de commissariat aux comptes dirigée par trois associés experts-comptables diplômés, au 12 rue du Helder, Paris 9e.",
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
            PRAXOR Audit est une société de commissariat aux comptes et d’expertise comptable,
            dirigée par trois associés experts-comptables diplômés.
          </p>
        }
        asideLabel="Le cabinet en bref"
        aside={[
          { label: "Associés", value: "3" },
          { label: "Expérience cumulée", value: "+60 ans" },
          { label: "Adresse", value: "Paris 9e" },
        ]}
      />

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="presentation-title">
        <div className="wrap grid-12">
          <div className="cabinet-intro__media reveal-clip">
            <Picture image="facade" sizes="(max-width: 1023px) 100vw, 40vw" />
          </div>
          <div className="cabinet-intro__body">
            <h2 id="presentation-title" className="heading reveal">
              Sécuriser et développer l’activité de nos clients
            </h2>
            <p className="lead reveal">
              Le cabinet totalise plus de soixante ans d’expérience dans les métiers de l’audit, de
              l’expertise comptable et du conseil. Ses professionnels sont à votre écoute pour vous
              conseiller et vous aider à développer vos activités en toute sécurité.
            </p>
            <p className="body-mute reveal">
              De la société cotée à la PME, le cabinet accompagne tout type de structures, pour des
              missions récurrentes et ponctuelles. Sa valeur ajoutée repose sur l’adaptation de son
              service aux spécificités structurelles, sectorielles et stratégiques de chaque entité.
            </p>
          </div>
        </div>
      </section>

      <Figures />

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="secteurs-title">
        <div className="wrap">
          <div className="grid-12 section-intro">
            <h2 id="secteurs-title" className="heading section-intro__title reveal">
              Secteurs d’activité
            </h2>
            <p className="section-intro__text lead reveal">
              La clientèle du cabinet couvre des secteurs très différents, dont nous connaissons les
              métiers et les contraintes.
            </p>
          </div>
          <ul className="sectors">
            {SECTORS.map((s, i) => (
              <li key={s.name} className="sector reveal" style={{ ["--d" as string]: `${(i % 4) * 60}ms` }}>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section dark" aria-labelledby="inscriptions-title">
        <div className="wrap grid-12 split">
          <div className="split__head">
            <h2 id="inscriptions-title" className="heading reveal">
              Inscriptions professionnelles
            </h2>
          </div>
          <div className="split__body">
            <ul className="ticks reveal">
              <li style={{ color: "var(--on-ink)" }}>
                <Keep text={REGULATORY.ordre} />
              </li>
              <li style={{ color: "var(--on-ink)" }}>{REGULATORY.crcc}</li>
            </ul>
            <p className="reveal">
              {FIRM.legalName}, société d’expertise comptable et de commissariat aux comptes au capital
              de {FIRM.capital}, {FIRM.rcs}.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="rejoindre-title">
        <div className="wrap grid-12 split">
          <div className="split__head">
            <h2 id="rejoindre-title" className="heading reveal">
              Rejoindre PRAXOR
            </h2>
          </div>
          <div className="split__body">
            <p className="lead reveal">
              Vous souhaitez rejoindre le cabinet ? Voici les profils que nous recherchons.
            </p>
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
