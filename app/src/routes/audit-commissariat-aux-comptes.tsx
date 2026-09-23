import { createFileRoute } from "@tanstack/react-router";

import { ContactBand } from "../components/site/ContactBand";
import { PageHero } from "../components/site/PageHero";
import { Picture } from "../components/site/Picture";
import { StructuredData } from "../components/site/StructuredData";
import { breadcrumbSchema, pageHead } from "../lib/seo";
import { fr } from "../lib/site";

const PATH = "/audit-commissariat-aux-comptes";

export const Route = createFileRoute("/audit-commissariat-aux-comptes")({
  head: () =>
    pageHead({
      title: "Commissaire aux comptes et audit à Paris | PRAXOR Audit",
      description:
        "Commissaire aux comptes à Paris : certification des comptes, commissariat aux apports et à la fusion, audit d’acquisition et audits contractuels.",
      path: PATH,
    }),
  component: AuditPage,
});

const MISSIONS = [
  { title: "Commissariat aux comptes", text: "Certification des comptes annuels." },
  { title: "Commissariat aux apports et à la fusion", text: "Lors des opérations d’apport et de fusion." },
  { title: "Commissariat à la transformation", text: "Lors de la transformation d’une société." },
  { title: "Audit d’acquisition", text: "Pour éclairer une décision de rachat." },
  {
    title: "Audit des systèmes d’information",
    text: "Revue des procédures dans des environnements ERP, dont SAP.",
  },
  { title: "Revue du contrôle interne", text: "Identification des faiblesses et recommandations." },
  { title: "Audits contractuels", text: "Acquisition, investissement, organisation." },
];

const AXES = [
  "Certification des comptes annuels",
  "Contrôle complet et permanent",
  "Devoir d’information",
  "Prévention des difficultés",
  "Interventions spécifiques",
];

const INTEREST = [
  "Elle renforce la confiance dans l’information financière communiquée dans les comptes.",
  "Elle est d’intérêt public et apporte de la transparence dans le fonctionnement des organisations.",
  "Elle crédibilise l’information financière diffusée aux parties prenantes.",
];

function AuditPage() {
  return (
    <>
      <StructuredData
        json={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Audit et commissariat aux comptes", path: PATH },
        ])}
      />
      <PageHero
        crumb="Audit & commissariat aux comptes"
        lines={["Audit & commissariat", "aux comptes"]}
        lead={
          <p>
            PRAXOR offre aux sociétés cotées et aux PME la garantie d’un expert indépendant, qui
            réalise ses missions dans un souci constant de dialogue et de transparence.
          </p>
        }
        asideLabel="Cadre de la mission"
        aside={[
          { label: "Mandat", value: "6 ans" },
          { label: "Cadre légal", value: "Code de commerce" },
          { label: "Référentiel", value: "Normes professionnelles" },
          { label: "Contrôle", value: "Compagnie régionale" },
        ]}
      />

      <div className="wrap">
        <div className="strip reveal-clip">
          <Picture image="facade" sizes="(max-width: 1440px) 100vw, 1312px" position="50% 42%" />
        </div>
      </div>

      <section className="section" aria-labelledby="categories-title">
        <div className="wrap">
          <div className="grid-12 section-intro">
            <h2 id="categories-title" className="heading section-intro__title reveal">
              Deux grandes catégories de missions
            </h2>
            <p className="section-intro__text lead reveal">
              {fr(
                "Nos missions sont menées par référence aux normes professionnelles, ce qui confère à l’information financière auditée un gage de régularité et de sincérité.",
              )}
            </p>
          </div>
          <div className="quad">
            <div className="quad__cell reveal">
              <h3>L’audit légal</h3>
              <p>
                Le commissariat aux comptes : certification des comptes annuels et interventions
                prévues par la loi.
              </p>
            </div>
            <div className="quad__cell reveal" style={{ ["--d" as string]: "80ms" }}>
              <h3>Les audits contractuels</h3>
              <p>Audits d’acquisition, d’investissement et d’organisation, réalisés à votre demande.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="role-title">
        <div className="wrap grid-12 split">
          <div className="split__head">
            <h2 id="role-title" className="heading reveal">
              Le rôle du commissaire aux comptes
            </h2>
          </div>
          <div className="split__body">
            <p className="lead reveal">
              {fr(
                "Sous l’égide du ministère de la Justice, le commissaire aux comptes est garant de la fiabilité de l’information financière et comptable produite par les entreprises. Sa nomination est obligatoire dans les cas définis par la loi ; elle peut aussi relever d’une démarche volontaire.",
              )}
            </p>
            <p className="reveal">
              {fr(
                "Il ne duplique pas le travail de l’expert-comptable et n’a pas vocation à conseiller les dirigeants. Sa mission complète celle de l’expertise comptable : analyse en amont du contrôle interne, participation aux inventaires de clôture, étude du circuit des données à leur source et recommandations pour en améliorer la sécurité.",
              )}
            </p>
            <p className="body-mute reveal">
              Nommé pour un mandat de six ans, il est lui-même régulièrement contrôlé par la compagnie
              régionale des commissaires aux comptes dont il relève.
            </p>
            <div className="reveal">
              <h3 className="mono body-mute" style={{ fontWeight: 400, marginBottom: 8, marginTop: 12 }}>
                Sa démarche s’articule autour de
              </h3>
              <ul className="ticks">
                {AXES.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="interet-title">
        <div className="wrap">
          <div className="grid-12 section-intro">
            <h2 id="interet-title" className="heading section-intro__title reveal">
              Une mission à fort intérêt économique
            </h2>
          </div>
          <ol className="biglist">
            {INTEREST.map((t, i) => (
              <li key={t} className="biglist__item reveal" style={{ ["--d" as string]: `${i * 70}ms` }}>
                <span>{t}</span>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="missions-title">
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
        </div>
      </section>

      <section className="section dark" aria-labelledby="clientele-title">
        <div className="wrap grid-12 split">
          <div className="split__head">
            <h2 id="clientele-title" className="heading reveal">
              De la PME aux grands comptes
            </h2>
          </div>
          <div className="split__body">
            <p className="lead reveal" style={{ color: "var(--on-ink)" }}>
              Le commissariat aux comptes est au cœur du métier du cabinet, pour une clientèle de grands
              comptes, de PME et d’associations.
            </p>
            <p className="reveal">
              Auprès des grands comptes, nos équipes interviennent en co-commissariat aux comptes,
              généralement aux côtés de cabinets d’audit internationaux. Le cabinet réalise également
              des missions d’audit légal pour des OPCVM et des sociétés du secteur bancaire.
            </p>
          </div>
        </div>
      </section>

      <ContactBand
        title="Parlons de votre mandat."
        text="Commissariat aux comptes, aux apports ou à la fusion, audit contractuel : échangeons sur votre situation et sur le calendrier de la mission."
      />
    </>
  );
}
