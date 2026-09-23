import { Link } from "@tanstack/react-router";

import { FIRM } from "../../lib/site";
import { Arrow } from "./Arrow";

/** Closing call to action for inner pages (the home page has its own, larger one). */
export function ContactBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="section" style={{ background: "var(--paper-2)" }} aria-labelledby="contact-band">
      <div className="wrap grid-12 contact-band__inner">
        <h2 id="contact-band" className="contact-band__title reveal">
          {title}
        </h2>
        <div className="contact-band__side reveal" style={{ ["--d" as string]: "120ms" }}>
          <p className="body-mute">{text}</p>
          <div className="hero__ctas">
            <Link to="/contact" className="cta-solid">
              Contacter PRAXOR
              <Arrow />
            </Link>
            <a href={FIRM.phoneHref} className="cta-text">
              {FIRM.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
