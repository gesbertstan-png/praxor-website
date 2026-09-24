import { createFileRoute } from "@tanstack/react-router";

import { ContactBand } from "../components/site/ContactBand";
import { PageHero } from "../components/site/PageHero";
import { Picture } from "../components/site/Picture";
import { StructuredData } from "../components/site/StructuredData";
import { breadcrumbSchema, pageHead } from "../lib/seo";
import { fr } from "../lib/site";

const PATH = "/expertise-comptable";

export const Route = createFileRoute("/expertise-comptable")({
  head: () =>
    pageHead({
      title: "Expertise comptable à Paris | PRAXOR Audit",
      description:
        "Expert-comptable à Paris 9e : comptes annuels, tenue comptable, consolidation, reporting, paie, fiscalité et juridique, avec Pennylane et Silae.",
      path: PATH,
    }),
  component: ExpertiseComptablePage,
});

const MISSIONS = [
  {
    title: "Établissement des comptes annuels",
    text: "La production de vos documents comptables et légaux de fin d’exercice.",
  },
  {
    title: "Tenue comptable",
    text: "L’externalisation de votre fonction administrative et comptable.",
  },
  {
    title: "Procédures administratives et comptables",
    text: "La formalisation de vos procédures et de votre contrôle interne.",
  },
  {
    title: "Comptes consolidés",
    text: "L’établissement des comptes consolidés de votre groupe.",
  },
  {
    title: "Reporting",
    text: "Au format français, anglo-saxon ou propre à votre groupe.",
  },
  {
    title: "Accompagnement dans la gestion",
    text: "Dans la continuité de ces travaux, un partenaire pour vous conseiller dans la gestion de votre entreprise.",
  },
];

const SERVICES = [
  {
    title: "Social et paie",
    text: "Le cabinet élabore vos documents sociaux obligatoires et limite les risques liés au respect du droit du travail.",
    items: [
      "Bulletins de paie",
      "Déclarations sociales mensuelles, trimestrielles et annuelles",
      "Audit social",
      "Externalisation de la paie",
      "Assistance lors des contrôles Urssaf",
    ],
  },
  {
    title: "Fiscal",
    text: "Dans le prolongement de la tenue des comptes, nous établissons les déclarations fiscales liées à votre activité ou à titre personnel.",
    items: [
      "Sociétés commerciales",
      "Entreprises individuelles",
      "Professions libérales",
      "Particuliers",
    ],
  },
  {
    title: "Juridique",
    text: "En étroite relation avec des avocats et des notaires, nous proposons les montages juridiques les plus adaptés à votre projet.",
    items: [
      "Conseil au choix de la structure juridique",
      "Formalités de constitution des sociétés",
      "Secrétariat juridique et assemblées générales",
      "Restructurations : fusions, scissions, apports partiels d’actifs",
    ],
  },
  {
    title: "Informatique",
    text: "Le cabinet a réalisé des contrôles de procédures dans des groupes utilisant des ERP et maîtrise le fonctionnement de SAP et d’Oracle.",
    items: [
      "Intégration et import de données",
      "Tenue de comptabilité sous ERP",
      "Analyse du contrôle interne sous SAP",
      "Accompagnement des opérations de migration",
      "Contrôle de comptes sociaux et consolidés",
      "Élaboration et gestion de bases de données",
    ],
  },
];

function ExpertiseComptablePage() {
  return (
    <>
      <StructuredData
        json={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Expertise comptable", path: PATH },
        ])}
      />
      <PageHero
        crumb="Expertise comptable"
        lines={["Expertise", "comptable"]}
        lead={
          <p>
            {fr(
              "Notre objectif premier : assurer la production de vos documents comptables, fiscaux et légaux, en intégrant vos process administratifs. Un cabinet d’expertise comptable à Paris, et un partenaire pour la gestion de votre entreprise.",
            )}
          </p>
        }
        asideLabel="Sur cette page"
        aside={[
          { label: "Missions principales", href: "#missions" },
          { label: "Services associés", href: "#services" },
          { label: "Process intégrés", href: "#outils" },
        ]}
      />

      <div className="wrap">
        <div className="strip reveal-clip">
          <Picture image="parquet" sizes="(max-width: 1440px) 100vw, 1312px" position="50% 58%" />
        </div>
      </div>

      <section className="section" aria-labelledby="relation-title">
        <div className="wrap grid-12 split">
          <h2 id="relation-title" className="heading split__head reveal">
            Une relation fondée sur l’expérience et la proximité
          </h2>
          <div className="split__body">
            <p className="lead reveal">
              La qualité de la relation repose sur la capacité du cabinet à vous offrir des interlocuteurs
              expérimentés et réactifs, sur deux plans.
            </p>
            <ul className="ticks reveal">
              <li>Le cœur de métier : le conseil en matière fiscale, sociale, comptable et financière.</li>
              <li>
                La mise en place de process informatiques, avec des logiciels capables d’intégrer tous
                vos flux financiers, pour fluidifier les échanges et saisir toutes vos opérations.
              </li>
            </ul>
            <p className="body-mute reveal">
              Notre proximité avec nos clients nous permet d’être à l’écoute de leurs demandes et
              d’échanger régulièrement avec eux.
            </p>
          </div>
        </div>
      </section>

      <section id="missions" className="section" style={{ paddingTop: 0 }} aria-labelledby="missions-title">
        <div className="wrap">
          <div className="grid-12 section-intro">
            <h2 id="missions-title" className="heading section-intro__title reveal">
              Missions principales
            </h2>
          </div>
          <ol className="register">
            {MISSIONS.map((m, i) => (
              <li key={m.title} className="register__row reveal" style={{ ["--d" as string]: `${i * 50}ms` }}>
                <span className="register__index mono">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="register__title">{m.title}</h3>
                <p className="register__text">{m.text}</p>
              </li>
            ))}
          </ol>
          <p className="body-mute measure reveal" style={{ marginTop: 32 }}>
            Pour faciliter l’élaboration de vos états financiers, nous utilisons les solutions
            informatiques adéquates, qui permettent la récupération et la sauvegarde de vos données
            comptables.
          </p>
        </div>
      </section>

      <section id="services" className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="services-title">
        <div className="wrap">
          <div className="grid-12 section-intro">
            <h2 id="services-title" className="heading section-intro__title reveal">
              Services associés
            </h2>
            <p className="section-intro__text lead reveal">
              Social, fiscal, juridique et informatique : les compétences qui prolongent la mission
              d’expertise comptable.
            </p>
          </div>
          <div className="quad">
            {SERVICES.map((s) => (
              <div key={s.title} className="quad__cell reveal">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul className="ticks">
                  {s.items.map((item) => (
                    <li key={item}>{fr(item)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="outils" className="section" aria-labelledby="outils-title">
        <div className="wrap grid-12 split">
          <div className="split__head">
            <h2 id="outils-title" className="heading reveal">
              Des process intégrés
            </h2>
            <dl className="kv reveal">
              <div>
                <dt>Pennylane</dt>
                <dd>Facturation, achats, comptabilité et trésorerie</dd>
              </div>
              <div>
                <dt>Silae</dt>
                <dd>Paie et gestion des ressources humaines</dd>
              </div>
            </dl>
            <p className="body-mute reveal">
              {fr(
                "Silae garantit la qualité des bulletins ; son module de gestion des ressources humaines, avec planning intégré et circuit d’approbation, fiabilise le suivi des absences.",
              )}
            </p>
          </div>
          <div className="split__body">
            <p className="lead reveal">
              {fr(
                "Le cabinet est partenaire privilégié de Pennylane. Comme un ERP, le logiciel structure votre organisation administrative et comptable : toutes les opérations y sont intégrées, sans ressaisie ni export entre logiciels.",
              )}
            </p>
            <ul className="ticks reveal">
              <li>{fr("Facturation : devis, commandes, factures, paiement par carte ou virement, relances, rapprochement avec les encaissements.")}</li>
              <li>{fr("Achats : récupération automatique des factures, validation et paiement, notes de frais.")}</li>
              <li>{fr("Comptabilité : synchronisation bancaire, immobilisations et emprunts, analytique, TVA, déclarations fiscales et comptes annuels.")}</li>
              <li>{fr("Trésorerie : gestion bancaire et paiements.")}</li>
            </ul>
          </div>
        </div>
      </section>

      <ContactBand
        title="Parlons de votre comptabilité."
        text="Tenue, révision, consolidation, paie : présentez-nous votre organisation et vos besoins, nous vous proposerons une mission adaptée."
      />
    </>
  );
}
