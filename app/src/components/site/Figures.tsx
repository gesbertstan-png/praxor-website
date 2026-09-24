import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { FIRM, REGULATORY } from "../../lib/site";
import { useCountUp } from "../../lib/motion";
import { Arrow } from "./Arrow";
import { Keep } from "./Keep";

/**
 * Key figures, all verified: founding year (registry), partners and cumulated
 * experience (firm presentation), range of clients (firm presentation).
 * "+60" is the partners' cumulated experience, never the firm's age.
 */
function Figure({ value, label, text, d }: { value: ReactNode; label: ReactNode; text: string; d: number }) {
  return (
    <div className="figure reveal" style={{ ["--d" as string]: `${d}ms` }}>
      <div className="figure__value">{value}</div>
      <p className="figure__label">
        <strong>{label}</strong>
        {text}
      </p>
    </div>
  );
}

function Partners() {
  const ref = useCountUp<HTMLSpanElement>(3, 700);
  return (
    <>
      <span className="sr-only">3</span>
      <span ref={ref} aria-hidden="true">
        3
      </span>
    </>
  );
}

function Experience() {
  const ref = useCountUp<HTMLSpanElement>(60, 1200);
  return (
    <>
      <span className="sr-only">Plus de 60</span>
      <span className="figure__plus" aria-hidden="true">
        +
      </span>
      <span ref={ref} aria-hidden="true">
        60
      </span>
    </>
  );
}

function Range() {
  return (
    <>
      <span className="sr-only">De la PME à la société cotée</span>
      <span aria-hidden="true">PME</span>
      <Arrow />
      <span aria-hidden="true">cotées</span>
    </>
  );
}

/** Home: "Depuis 1975" statement, three key figures and the professional registrations. */
export function SinceBlock() {
  return (
    <section className="since" aria-labelledby="since-title">
      <div className="wrap">
        <div className="since__top">
          <h2 id="since-title" className="since__title reveal">
            <span className="since__kicker">Depuis</span>
            <span className="since__year">{FIRM.founded}</span>
          </h2>
          <div className="since__text reveal" style={{ ["--d" as string]: "100ms" }}>
            <p className="since__statement">
              PRAXOR Audit accompagne les entreprises et leurs dirigeants dans leurs enjeux comptables,
              financiers et de contrôle.
            </p>
            <p className="body-mute">
              Société de commissariat aux comptes et d’expertise comptable dirigée par trois associés,
              le cabinet adapte chaque mission aux spécificités de l’entreprise, de la PME à la société
              cotée.
            </p>
            <Link to="/le-cabinet" className="link-arrow">
              Découvrir le cabinet
              <Arrow />
            </Link>
          </div>
        </div>

        <div className="figures__row">
          <Figure
            d={0}
            value={<Partners />}
            label={
              <>
                associés <span className="nowrap">experts-comptables</span> diplômés
              </>
            }
            text="à la direction du cabinet."
          />
          <Figure
            d={100}
            value={<Experience />}
            label="ans d’expérience cumulée"
            text="des associés, en audit, en expertise comptable et en conseil."
          />
          <Figure
            d={200}
            value={<Range />}
            label="structures accompagnées"
            text="De la PME à la société cotée, pour des missions récurrentes comme ponctuelles."
          />
        </div>

        <div className="figures__foot reveal">
          <p>
            <Keep text={REGULATORY.ordre} />
          </p>
          <p>
            <Keep text={REGULATORY.crcc} />
          </p>
        </div>
      </div>
    </section>
  );
}

/** Le cabinet: the four facts as a compact 2 x 2 register. */
export function FactsGrid() {
  return (
    <div className="facts">
      <Figure d={0} value={<span>{FIRM.founded}</span>} label="année de création" text="du cabinet." />
      <Figure
        d={80}
        value={<Partners />}
        label={
          <>
            associés <span className="nowrap">experts-comptables</span>
          </>
        }
        text="diplômés, à la direction du cabinet."
      />
      <Figure d={160} value={<Experience />} label="ans d’expérience cumulée" text="des associés." />
      <Figure d={240} value={<Range />} label="structures accompagnées" text="de la PME à la société cotée." />
    </div>
  );
}
