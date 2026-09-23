import { Link } from "@tanstack/react-router";

import { FIRM, NAV } from "../../lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const metiers = NAV.slice(0, 3);
  const cabinet = NAV.slice(3);

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="grid-12 site-footer__top">
          <div className="site-footer__brand">
            <Logo title="PRAXOR Audit" />
            <p>
              Expertise comptable, audit et commissariat aux comptes, conseil aux dirigeants. Paris
              9e.
            </p>
          </div>

          <nav className="site-footer__col" aria-labelledby="footer-metiers">
            <h2 id="footer-metiers">Métiers</h2>
            {metiers.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>

          <nav className="site-footer__col" aria-labelledby="footer-cabinet">
            <h2 id="footer-cabinet">Cabinet</h2>
            {cabinet.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-footer__col site-footer__col--wide">
            <h2>Coordonnées</h2>
            <address style={{ fontStyle: "normal" }}>
              {FIRM.name}
              <br />
              {FIRM.street}
              <br />
              {FIRM.postalCode} {FIRM.city}
            </address>
            <a href={FIRM.phoneHref}>Tél. {FIRM.phoneDisplay}</a>
            <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
          </div>
        </div>

        <div className="site-footer__legal">
          <p>
            {FIRM.legalName}, société d’expertise comptable et de commissariat aux comptes au capital
            de {FIRM.capital}, {FIRM.rcs}. Inscrite au tableau de l’Ordre des experts-comptables de la
            région Paris Île-de-France. Commissaires aux comptes membres des Compagnies régionales de
            Paris et de Versailles.
          </p>
          <nav aria-label="Informations légales">
            <span>© {year} {FIRM.name}</span>
            <Link to="/mentions-legales">Mentions légales</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
