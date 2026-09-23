import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { FIRM, NAV } from "../../lib/site";
import { useOverDark, useScrolled } from "../../lib/motion";
import { Logo } from "./Logo";

export function Header() {
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overDark = useOverDark(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const main = document.getElementById("contenu");
    const footer = document.querySelector<HTMLElement>(".site-footer-wrap");
    const root = document.documentElement;
    if (!open) {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      root.style.overflow = "";
      return;
    }
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    root.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      root.style.overflow = "";
    };
  }, [open]);

  const desktopNav = NAV.filter((item) => item.to !== "/contact");

  return (
    <>
      <header
        className={`site-header${scrolled ? " is-scrolled" : ""}${overDark && !open ? " on-dark" : ""}${open ? " menu-open" : ""}`}
      >
        <div className="wrap site-header__inner">
          <Link to="/" className="site-header__logo" aria-label="PRAXOR Audit, accueil">
            <Logo title="PRAXOR Audit" />
          </Link>

          <nav className="site-nav" aria-label="Navigation principale">
            {desktopNav.map((item) => (
              <Link key={item.to} to={item.to} className="site-nav__link">
                {item.short ?? item.label}
              </Link>
            ))}
          </nav>

          <Link to="/contact" className="cta-header">
            Nous contacter
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? "Fermer" : "Menu"}</span>
            <span className="menu-toggle__bars" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        id="menu-mobile"
        ref={menuRef}
        className={`mobile-menu${open ? " is-open" : ""}`}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <nav aria-label="Navigation mobile">
          <ul className="mobile-menu__list">
            {NAV.map((item, i) => (
              <li key={item.to} className="mobile-menu__item" style={{ ["--i" as string]: i }}>
                <Link to={item.to} className="mobile-menu__link">
                  <span>{item.label}</span>
                  <span className="mono mobile-menu__index">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot">
          <a href={FIRM.phoneHref}>{FIRM.phoneDisplay}</a>
          <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
          <span>
            {FIRM.street}, {FIRM.postalCode} {FIRM.city}
          </span>
        </div>
      </div>
    </>
  );
}
