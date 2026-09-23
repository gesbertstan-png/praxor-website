import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Arrow } from "./Arrow";

type AsideItem = { label: string; value?: string; href?: string };

type PageHeroProps = {
  crumb: string;
  lines: string[];
  lead: ReactNode;
  aside?: AsideItem[];
  asideLabel?: string;
};

/** Editorial page opening: breadcrumb, monumental title set line by line, lead and a side register. */
export function PageHero({ crumb, lines, lead, aside, asideLabel }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <nav aria-label="Fil d’Ariane">
          <ol className="crumbs mono">
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{crumb}</li>
          </ol>
        </nav>
        <div className="grid-12">
          <h1 className="page-hero__title">
            {lines.map((line, i) => (
              <span key={line} className="hero__line">
                <span style={{ ["--i" as string]: i }}>{line}</span>
              </span>
            ))}
          </h1>
          <div className="page-hero__lead lead measure">{lead}</div>
          {aside ? (
            <ul className="page-hero__aside" aria-label={asideLabel}>
              {aside.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href}>
                      <span>{item.label}</span>
                      <Arrow />
                    </a>
                  ) : (
                    <>
                      <span>{item.label}</span>
                      {item.value ? <span className="mono">{item.value}</span> : null}
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
