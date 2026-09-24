import { Link } from "@tanstack/react-router";

import { FIRM, fr } from "../../lib/site";
import { Arrow } from "./Arrow";

/**
 * Closing call to action for inner pages: the night-blue block that runs into the
 * footer, same composition as the home page ending (title, then text and actions).
 */
export function ContactBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="dark final final--page" aria-labelledby="contact-band">
      <div className="wrap grid-12">
        <h2 id="contact-band" className="final__title reveal">
          {title}
        </h2>
        <div className="final__row reveal" style={{ ["--d" as string]: "120ms" }}>
          <p className="final__text">{fr(text)}</p>
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
