import { createFileRoute } from "@tanstack/react-router";

import { Arrow } from "../components/site/Arrow";
import { ContactForm } from "../components/site/ContactForm";
import { PageHero } from "../components/site/PageHero";
import { Keep } from "../components/site/Keep";
import { ParisPlan } from "../components/site/ParisPlan";
import { StructuredData } from "../components/site/StructuredData";
import { ORGANIZATION_SCHEMA, breadcrumbSchema, pageHead } from "../lib/seo";
import { FIRM } from "../lib/site";

const PATH = "/contact";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact | PRAXOR Audit, 12 rue du Helder, Paris 9e",
      description:
        "Contacter PRAXOR Audit, cabinet d’expertise comptable et d’audit : 12 rue du Helder, 75009 Paris. Tél. +33 (0)1 42 60 40 08, praxor@praxor.fr.",
      path: PATH,
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <StructuredData json={ORGANIZATION_SCHEMA} />
      <StructuredData
        json={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Contact", path: PATH },
        ])}
      />
      <PageHero
        crumb="Contact"
        lines={["Nous contacter"]}
        lead={
          <p>
            Une question, un projet, une mission : présentez-nous votre situation. Nos professionnels
            sont à votre écoute.
          </p>
        }
      />

      <section className="section" style={{ paddingTop: 0 }} aria-label="Coordonnées et formulaire">
        <div className="wrap grid-12">
          <div className="contact__coords">
            <dl style={{ margin: 0 }}>
              <div className="coord">
                <dt className="mono">Adresse</dt>
                <dd>
                  <address style={{ fontStyle: "normal" }}>
                    {FIRM.name}
                    <br />
                    {FIRM.street}
                    <br />
                    {FIRM.postalCode} {FIRM.city}
                  </address>
                </dd>
              </div>
              <div className="coord">
                <dt className="mono">Téléphone</dt>
                <dd>
                  <a href={FIRM.phoneHref}>{FIRM.phoneDisplay}</a>
                </dd>
              </div>
              <div className="coord">
                <dt className="mono">Télécopie</dt>
                <dd>{FIRM.faxDisplay}</dd>
              </div>
              <div className="coord">
                <dt className="mono">E-mail</dt>
                <dd>
                  <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
                </dd>
              </div>
              <div className="coord">
                <dt className="mono">Accès</dt>
                <dd>
                  <Keep text={`${FIRM.metro}.`} />
                </dd>
              </div>
            </dl>
            <p style={{ paddingBlock: 20 }}>
              <a href={FIRM.mapsHref} className="link-arrow" target="_blank" rel="noopener noreferrer">
                Itinéraire vers le cabinet
                <Arrow />
              </a>
            </p>
            <div className="reveal" style={{ marginTop: 16 }}>
              <ParisPlan />
            </div>
          </div>

          <div className="contact__form">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
