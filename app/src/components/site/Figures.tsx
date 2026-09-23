import { REGULATORY } from "../../lib/site";
import { useCountUp } from "../../lib/motion";
import { Arrow } from "./Arrow";
import { Keep } from "./Keep";

/** Key figures, all quoted from the firm’s own presentation. */
export function Figures() {
  const years = useCountUp<HTMLSpanElement>(60, 1200);
  const partners = useCountUp<HTMLSpanElement>(3, 700);

  return (
    <section className="figures" aria-labelledby="reperes">
      <div className="wrap">
        <div className="figures__head">
          <h2 id="reperes" className="figures__title">
            PRAXOR en quelques repères
          </h2>
          <span className="mono" aria-hidden="true">
            Audit · Expertise comptable · Conseil
          </span>
        </div>
        <div className="figures__row">
          <div className="figure reveal">
            <p className="figure__value">
              <span className="sr-only">Plus de 60</span>
              <span className="figure__plus" aria-hidden="true">
                +
              </span>
              <span ref={years} aria-hidden="true">
                60
              </span>
            </p>
            <p className="figure__label">
              <strong>ans d’expérience cumulée</strong>
              dans les métiers de l’audit, de l’expertise comptable et du conseil.
            </p>
          </div>
          <div className="figure reveal" style={{ ["--d" as string]: "100ms" }}>
            <p className="figure__value">
              <span className="sr-only">3</span>
              <span ref={partners} aria-hidden="true">
                3
              </span>
            </p>
            <p className="figure__label">
              <strong>
                associés <span className="nowrap">experts-comptables</span> diplômés
              </strong>
              à la direction du cabinet.
            </p>
          </div>
          <div className="figure reveal" style={{ ["--d" as string]: "200ms" }}>
            <p className="figure__value figure__value--words">
              <span className="sr-only">De la PME à la société cotée</span>
              <span aria-hidden="true">PME</span>
              <Arrow />
              <span aria-hidden="true">cotées</span>
            </p>
            <p className="figure__label">
              <strong>structures accompagnées</strong>
              De la PME à la société cotée, pour des missions récurrentes comme ponctuelles.
            </p>
          </div>
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
