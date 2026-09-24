import { FIRM, SITE_URL } from "./site";

export const OG_IMAGE = `${SITE_URL}/og-praxor.jpg`;

type PageHeadInput = {
  title: string;
  description: string;
  path: string;
  robots?: string;
};

/** Per-route <head>: unique title/description, canonical, Open Graph and Twitter cards. */
export function pageHead({ title, description, path, robots }: PageHeadInput) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(robots ? [{ name: "robots", content: robots }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${FIRM.name}, ${FIRM.street}, ${FIRM.postalCode} ${FIRM.city}` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: FIRM.street,
  postalCode: FIRM.postalCode,
  addressLocality: FIRM.city,
  addressCountry: "FR",
};

export const ORGANIZATION_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["AccountingService", "ProfessionalService"],
      "@id": `${SITE_URL}/#cabinet`,
      name: FIRM.name,
      legalName: FIRM.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}/praxor-logo.svg`,
      image: OG_IMAGE,
      description:
        "Société de commissariat aux comptes et d’expertise comptable créée en 1975, installée à Paris 9e et dirigée par trois associés experts-comptables diplômés : expertise comptable, audit et conseil aux dirigeants.",
      telephone: "+33142604008",
      email: FIRM.email,
      address: ADDRESS,
      foundingDate: FIRM.foundedDate,
      identifier: [
        { "@type": "PropertyValue", propertyID: "SIREN", value: "308238393" },
        { "@type": "PropertyValue", propertyID: "APE", value: FIRM.ape },
      ],
      areaServed: { "@type": "City", name: "Paris" },
      knowsAbout: [
        "Expertise comptable",
        "Commissariat aux comptes",
        "Audit financier",
        "Conseil aux entreprises",
        "Due diligence",
        "Contrôle interne",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: FIRM.name,
      url: SITE_URL,
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#cabinet` },
    },
  ],
});

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  });
}
