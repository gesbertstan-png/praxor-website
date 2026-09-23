import { createFileRoute } from "@tanstack/react-router";

import { ContactBand } from "../components/site/ContactBand";
import { PageHero } from "../components/site/PageHero";
import { StructuredData } from "../components/site/StructuredData";
import { useActiveIndex } from "../lib/motion";
import { breadcrumbSchema, pageHead } from "../lib/seo";
import { EXPERTISES, fr } from "../lib/site";

const PATH = "/expertises";

export const Route = createFileRoute("/expertises")({
  head: () =>
    pageHead({
      title: "Expertises : création, due diligence, contrôle interne | PRAXOR",
      description:
        "Création et reprise, due diligence, contrôle interne, pilotage, transmission et cession, reporting : les expertises de PRAXOR Audit à Paris.",
      path: PATH,
    }),
  component: ExpertisesPage,
});

function ExpertisesPage() {
  const active = useActiveIndex(".xp__item", 0);
  return (
    <>
      <StructuredData
        json={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Expertises", path: PATH },
        ])}
      />
      <PageHero
        crumb="Expertises"
        lines={["Expertises"]}
        lead={
          <p>
            Au-delà de nos rôles d’expert-comptable, de commissaire aux comptes et de conseil, nos
            domaines d’expertise couvrent l’ensemble des besoins de l’entreprise, de sa création à sa
            transmission.
          </p>
        }
      />

      <section className="section" style={{ paddingTop: 0 }} aria-label="Domaines d’expertise">
        <div className="wrap grid-12 xp">
          <nav className="xp__index" aria-label="Sommaire des expertises">
            <ol>
              {EXPERTISES.map((x, i) => (
                <li key={x.slug}>
                  <a href={`#${x.slug}`} aria-current={active === i ? "true" : undefined}>
                    <span className="mono">{x.index}</span>
                    <span>{x.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="xp__content">
            {EXPERTISES.map((x) => (
              <article key={x.slug} id={x.slug} className="xp__item" aria-labelledby={`${x.slug}-title`}>
                <p className="xp__num mono reveal">{x.index}</p>
                <h2 id={`${x.slug}-title`} className="xp__title reveal">
                  {x.title}
                </h2>
                <p className="lead measure reveal">{fr(x.intro)}</p>
                <div className={`xp__groups${x.groups.length > 1 ? " xp__groups--two" : ""}`}>
                  {x.groups.map((g, gi) => (
                    <div key={g.heading ?? gi} className="xp__group reveal">
                      {g.heading ? <h3>{g.heading}</h3> : null}
                      {g.lead ? <p>{fr(g.lead)}</p> : null}
                      <ul className="ticks">
                        {g.items.map((item) => (
                          <li key={item}>{fr(item)}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactBand
        title="Parlons de votre situation."
        text="Chaque mission est construite à partir de vos spécificités. Présentez-nous votre entreprise et votre projet."
      />
    </>
  );
}
