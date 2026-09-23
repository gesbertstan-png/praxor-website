import { Link, createFileRoute } from "@tanstack/react-router";

import { Arrow } from "../components/site/Arrow";
import { ContactBand } from "../components/site/ContactBand";
import { PageHero } from "../components/site/PageHero";
import { Picture } from "../components/site/Picture";
import { StructuredData } from "../components/site/StructuredData";
import { breadcrumbSchema, pageHead } from "../lib/seo";
import { fr } from "../lib/site";

const PATH = "/conseil";

export const Route = createFileRoute("/conseil")({
  head: () =>
    pageHead({
      title: "Conseil aux dirigeants d’entreprise | PRAXOR Audit",
      description:
        "Conseil aux dirigeants à Paris : création, reprise, transmission, cession, réorganisations, contrôle interne, reporting et due diligence.",
      path: PATH,
    }),
  component: ConseilPage,
});

const REQUESTS: { label: string; to: string; hash?: string }[] = [
  { label: "La création ou la reprise d’entreprise", to: "/expertises", hash: "creation-reprise" },
  { label: "La transmission ou la cession d’entreprise", to: "/expertises", hash: "transmission-cession" },
  { label: "Les réorganisations juridiques : fusion, apport", to: "/expertise-comptable", hash: "services" },
  { label: "La mise en place de procédures de contrôle interne", to: "/expertises", hash: "controle-interne" },
  { label: "L’élaboration de reporting comptable et opérationnel", to: "/expertises", hash: "reporting" },
  { label: "Les due diligences et audits contractuels", to: "/expertises", hash: "due-diligence" },
  { label: "Le pilotage et la gestion de l’entreprise", to: "/expertises", hash: "pilotage-gestion" },
];

const MANAGEMENT = [
  "Optimisation fiscale",
  "Ressources humaines",
  "Décisions d’investissement",
  "Mise en place d’outils de gestion",
  "Élaboration et maîtrise d’un système d’information",
  "Évaluation des pratiques et communication financière",
];

function ConseilPage() {
  return (
    <>
      <StructuredData
        json={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Conseil", path: PATH },
        ])}
      />
      <PageHero
        crumb="Conseil"
        lines={["Conseil", "aux dirigeants"]}
        lead={
          <p>
            Les dirigeants d’entreprise nous sollicitent pour les assister dans les projets qui
            jalonnent la vie de leur entreprise. Des missions aux objectifs très divers, toujours
            adaptées à votre situation.
          </p>
        }
        asideLabel="Expertises liées"
        aside={[
          { label: "Création & reprise", href: "/expertises#creation-reprise" },
          { label: "Transmission & cession", href: "/expertises#transmission-cession" },
          { label: "Due diligence", href: "/expertises#due-diligence" },
        ]}
      />

      <div className="wrap">
        <div className="strip reveal-clip">
          <Picture image="toits" sizes="(max-width: 1440px) 100vw, 1312px" position="50% 55%" />
        </div>
      </div>

      <section className="section" aria-labelledby="demandes-title">
        <div className="wrap">
          <div className="grid-12 section-intro">
            <h2 id="demandes-title" className="heading section-intro__title reveal">
              Les demandes les plus fréquentes
            </h2>
            <p className="section-intro__text lead reveal">
              Chaque sujet renvoie à une expertise détaillée du cabinet.
            </p>
          </div>
          <ul className="biglist">
            {REQUESTS.map((r, i) => (
              <li key={r.label} className="reveal" style={{ ["--d" as string]: `${i * 50}ms` }}>
                <Link to={r.to} hash={r.hash}>
                  <span>{fr(r.label)}</span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="gestion-title">
        <div className="wrap grid-12 split">
          <div className="split__head">
            <h2 id="gestion-title" className="heading reveal">
              Éclairer les choix de gestion
            </h2>
          </div>
          <div className="split__body">
            <p className="lead reveal">
              Nous conseillons les dirigeants dans leurs choix de gestion, et réalisons des missions
              ponctuelles lors des opérations qui engagent l’entreprise.
            </p>
            <div className="quad reveal" style={{ borderTopColor: "var(--line)" }}>
              <div className="quad__cell">
                <h3>Choix de gestion</h3>
                <ul className="ticks">
                  {MANAGEMENT.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="quad__cell">
                <h3>Opérations</h3>
                <ul className="ticks">
                  <li>Audits d’investissement à l’occasion de rachats d’entreprises</li>
                  <li>Évaluations dans le cadre de restructurations</li>
                  <li>Réorganisations juridiques : fusion, apport</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactBand
        title="Parlons de votre projet."
        text="Création, reprise, cession ou réorganisation : présentez-nous votre projet et son calendrier. Nos professionnels sont à votre écoute."
      />
    </>
  );
}
