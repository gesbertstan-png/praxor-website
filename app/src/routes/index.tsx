import { Link, createFileRoute } from "@tanstack/react-router";

import { Arrow } from "../components/site/Arrow";
import { SinceBlock } from "../components/site/Figures";
import { Keep } from "../components/site/Keep";
import { ParisPlan } from "../components/site/ParisPlan";
import { Picture } from "../components/site/Picture";
import { StructuredData } from "../components/site/StructuredData";
import { srcSet } from "../lib/images";
import { useActiveIndex } from "../lib/motion";
import { ORGANIZATION_SCHEMA, pageHead } from "../lib/seo";
import { EXPERTISES, FIRM, METIERS, PRINCIPLES, fr } from "../lib/site";

const HERO_SIZES = "(max-width: 1023px) 100vw, 34vw";

export const Route = createFileRoute("/")({
  head: () => {
    const head = pageHead({
      title: "PRAXOR Audit | Expertise comptable, audit et conseil à Paris",
      description:
        "PRAXOR Audit, cabinet d’expertise comptable et de commissariat aux comptes créé en 1975, à Paris 9e. Trois associés experts-comptables, de la PME à la société cotée.",
      path: "/",
    });
    return {
      ...head,
      links: [
        ...head.links,
        {
          rel: "preload",
          as: "image",
          type: "image/avif",
          imageSrcSet: srcSet("facade", "avif"),
          imageSizes: HERO_SIZES,
          fetchPriority: "high",
        },
      ],
    };
  },
  component: Home,
});

function Home() {
  return (
    <>
      <StructuredData json={ORGANIZATION_SCHEMA} />
      <Hero />
      <SinceBlock />
      <Metiers />
      <Approche />
      <ExpertisesLedger />
      <Philosophie />
      <Paris />
      <FinalCta />
    </>
  );
}

function Hero() {
  const lines = ["L’expertise", "financière au service", "de vos décisions"];
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="guides" aria-hidden="true">
        <div className="wrap">
          <div className="grid-12">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="guides__col" style={{ ["--i" as string]: i }} />
            ))}
          </div>
        </div>
      </div>

      <div className="wrap grid-12 hero__grid">
        <div className="hero__text">
          <p className="hero__eyebrow mono">
            Cabinet d’expertise comptable et de commissariat aux comptes · Paris 9e
          </p>
          <h1 id="hero-title" className="hero__title">
            {lines.map((line, i) => (
              <span key={line} className="hero__line">
                <span style={{ ["--i" as string]: i }}>
                  {line}
                  {i === lines.length - 1 ? <span className="dot-accent">.</span> : null}
                </span>
              </span>
            ))}
          </h1>
          <div className="hero__bottom">
            <p className="hero__lead">
              PRAXOR accompagne les dirigeants, de la PME à la société cotée, en expertise
              comptable, en audit et commissariat aux comptes, et en conseil.
            </p>
            <div className="hero__ctas">
              <Link to="/expertises" className="cta-solid">
                Découvrir nos expertises
                <Arrow />
              </Link>
              <Link to="/contact" className="cta-text">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
        <div className="hero__media">
          <Picture image="facade" priority sizes={HERO_SIZES} />
        </div>
      </div>
    </section>
  );
}

function Metiers() {
  return (
    <section className="section" aria-labelledby="metiers-title">
      <div className="wrap">
        <div className="grid-12 section-intro">
          <h2 id="metiers-title" className="heading section-intro__title reveal">
            Nos métiers
          </h2>
          <p className="section-intro__text lead reveal" style={{ ["--d" as string]: "80ms" }}>
            Trois métiers complémentaires pour sécuriser et développer l’activité des entreprises que
            nous accompagnons.
          </p>
        </div>
        <ol className="metiers__list">
          {METIERS.map((m, i) => (
            <li key={m.to} className="metier reveal" style={{ ["--d" as string]: `${i * 80}ms` }}>
              <span className="metier__index mono">{m.index}</span>
              <h3 className="metier__title">
                <Link to={m.to} className="stretched">
                  {m.title}
                </Link>
              </h3>
              <p className="metier__text">{fr(m.text)}</p>
              <span className="metier__more" aria-hidden="true">
                Découvrir
                <Arrow />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Approche() {
  const items = [
    {
      term: "Structurelles",
      text: "Grands comptes, PME, associations : chaque organisation a son échelle et ses contraintes.",
    },
    {
      term: "Sectorielles",
      text: "Services, industrie, distribution, finance, haute technologie, audiovisuel : nous connaissons les métiers de nos clients.",
    },
    {
      term: "Stratégiques",
      text: "Création, croissance, acquisition, transmission : nos missions suivent les étapes de la vie de l’entreprise.",
    },
  ];
  return (
    <section className="section approche" aria-labelledby="approche-title">
      <div className="wrap grid-12">
        <div className="approche__body">
          <h2 id="approche-title" className="statement reveal">
            Un service ajusté aux spécificités de chaque entreprise.
          </h2>
          <p className="lead reveal">
            La valeur ajoutée de PRAXOR repose sur l’adaptation de son service aux spécificités
            structurelles, sectorielles et stratégiques de chaque client, pour des missions récurrentes
            comme ponctuelles.
          </p>
          <ul className="approche__list">
            {items.map((item, i) => (
              <li key={item.term} className="approche__item reveal" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span className="approche__term">{item.term}</span>
                <span className="approche__desc">{fr(item.text)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="approche__media reveal-clip">
          <Picture image="parquet" sizes="(max-width: 1023px) 100vw, 30vw" />
        </div>
      </div>
    </section>
  );
}

function ExpertisesLedger() {
  return (
    <section className="section" aria-labelledby="expertises-title">
      <div className="wrap">
        <div className="grid-12 section-intro">
          <h2 id="expertises-title" className="heading section-intro__title reveal">
            Expertises
          </h2>
          <p className="section-intro__text lead reveal" style={{ ["--d" as string]: "80ms" }}>
            Des domaines d’intervention précis, au service des décisions des dirigeants, à chaque étape
            de la vie de l’entreprise.
          </p>
        </div>
        <ul className="ledger">
          {EXPERTISES.map((x, i) => (
            <li key={x.slug} className="ledger__cell reveal" style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}>
              <div className="ledger__top">
                <span className="ledger__index mono">{x.index}</span>
                <span className="ledger__go" aria-hidden="true">
                  <Arrow />
                </span>
              </div>
              <h3 className="ledger__title">
                <Link to="/expertises" hash={x.slug} className="stretched">
                  {x.title}
                </Link>
              </h3>
              <p className="ledger__text">{fr(x.summary)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Philosophie() {
  const active = useActiveIndex(".principle", 0);
  return (
    <section className="section dark" aria-labelledby="philo-title">
      <div className="wrap grid-12">
        <div className="philo__aside">
          <h2 id="philo-title" className="heading reveal">
            Philosophie de l’audit
          </h2>
          <p className="reveal" style={{ ["--d" as string]: "80ms" }}>
            {fr(
              "Garant de la fiabilité de l’information financière, le commissaire aux comptes est nommé pour un mandat de six ans. Sa démarche est encadrée par le Code de commerce et par les normes professionnelles.",
            )}
          </p>
          <Link
            to="/audit-commissariat-aux-comptes"
            className="link-arrow reveal on-ink"
            style={{ ["--d" as string]: "160ms", color: "var(--on-ink)" }}
          >
            Audit et commissariat aux comptes
            <Arrow />
          </Link>
        </div>
        <ol className="philo__list">
          {PRINCIPLES.map((p, i) => (
            <li key={p.term} className={`principle${active === i ? " is-active" : ""}`}>
              <span className="principle__index mono">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="principle__term">{p.term}</h3>
              <p className="principle__text">{fr(p.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Paris() {
  return (
    <section aria-labelledby="paris-title">
      <div className="band reveal-clip">
        <Picture image="toits" sizes="100vw" />
      </div>
      <div className="section">
        <div className="wrap grid-12 paris__grid">
          <div className="paris__address">
            <h2 id="paris-title" className="figures__title">
              {FIRM.name}, au cœur du 9e arrondissement
            </h2>
            <address className="paris__street reveal">
              {FIRM.street}
              <span className="paris__city">
                {FIRM.postalCode} {FIRM.city}
              </span>
            </address>
            <div className="paris__meta reveal" style={{ ["--d" as string]: "120ms" }}>
              <p className="mono body-mute">{FIRM.coords}</p>
              <p className="body-mute">
                <Keep text={`${FIRM.metro}.`} />
              </p>
              <p>
                <a href={FIRM.phoneHref}>Tél. {FIRM.phoneDisplay}</a>
              </p>
              <p>
                <a href={FIRM.mapsHref} className="link-arrow" target="_blank" rel="noopener noreferrer">
                  Itinéraire vers le cabinet
                  <Arrow />
                </a>
              </p>
            </div>
          </div>
          <div className="paris__plan">
            <ParisPlan />
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="dark final" aria-labelledby="final-title">
      <div className="wrap grid-12">
        <h2 id="final-title" className="final__title reveal">
          Parlons de vos enjeux<span className="dot-accent">.</span>
        </h2>
        <div className="final__row reveal" style={{ ["--d" as string]: "120ms" }}>
          <p className="final__text">
            {fr(
              "Expertise comptable, audit, conseil : présentez-nous votre situation et vos projets. Nos professionnels sont à votre écoute.",
            )}
          </p>
          <div className="final__actions">
            <Link to="/contact" className="cta-final">
              Contacter PRAXOR
              <Arrow />
            </Link>
            <a href={FIRM.phoneHref} className="final__phone">
              {FIRM.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
