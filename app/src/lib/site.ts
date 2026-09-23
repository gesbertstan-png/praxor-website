// Every fact on this site comes from praxor.fr (legacy pages under /fr/ and the
// current homepage). Copy is modernised, never extended with new claims.

/** Canonical origin. Switch to https://praxor.fr once the domain points here. */
export const SITE_URL = "https://praxor-audit.higgsfield.app";

/**
 * French typography: no-break spaces before double punctuation and inside guillemets
 * (U+00A0: the web font has no narrow no-break space). Compound words are kept whole
 * with the .nowrap class where needed, so the indexed text stays plain.
 */
export function fr(text: string): string {
  return text
    .replace(/ ([:;!?])/g, " $1")
    .replace(/« /g, "« ")
    .replace(/ »/g, " »");
}

export const FIRM = {
  name: "PRAXOR Audit",
  legalName: "PRAXOR AUDIT",
  street: "12 rue du Helder",
  postalCode: "75009",
  city: "Paris",
  district: "Paris 9e",
  phoneDisplay: "+33 (0)1 42 60 40 08",
  phoneHref: "tel:+33142604008",
  faxDisplay: "+33 (0)1 42 60 30 26",
  email: "praxor@praxor.fr",
  capital: "400 000 €",
  rcs: "RCS Paris 308 238 393",
  coords: "48°52′ N · 2°20′ E",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=12+rue+du+Helder+75009+Paris",
  metro: "Métro Chaussée d’Antin-La Fayette (lignes 7 et 9) et Opéra (lignes 3, 7 et 8)",
} as const;

export const REGULATORY = {
  ordre:
    "Experts-comptables inscrits au tableau de l’Ordre des experts-comptables, région Paris Île-de-France.",
  crcc: "Commissaires aux comptes inscrits auprès des Compagnies régionales de Paris et de Versailles.",
} as const;

export type NavItem = { to: string; label: string; short?: string };

export const NAV: NavItem[] = [
  { to: "/expertise-comptable", label: "Expertise comptable" },
  { to: "/audit-commissariat-aux-comptes", label: "Audit & commissariat aux comptes", short: "Audit" },
  { to: "/conseil", label: "Conseil" },
  { to: "/expertises", label: "Expertises" },
  { to: "/le-cabinet", label: "Le cabinet" },
  { to: "/contact", label: "Contact" },
];

export const METIERS = [
  {
    index: "01",
    to: "/expertise-comptable",
    title: "Expertise comptable",
    text: "Comptes annuels, tenue comptable, comptes consolidés, reporting : des documents comptables et légaux fiables, et un partenaire pour la gestion de votre entreprise.",
    points: ["Comptes annuels", "Consolidation", "Reporting"],
  },
  {
    index: "02",
    to: "/audit-commissariat-aux-comptes",
    title: "Audit & commissariat aux comptes",
    text: "La garantie d’un expert indépendant pour certifier vos comptes et conduire vos audits contractuels, dans un souci constant de dialogue et de transparence.",
    points: ["Certification", "Apports et fusion", "Audit d’acquisition"],
  },
  {
    index: "03",
    to: "/conseil",
    title: "Conseil",
    text: "Création, reprise, transmission, réorganisation : nous assistons les dirigeants dans les projets qui jalonnent la vie de leur entreprise.",
    points: ["Création et reprise", "Cession", "Réorganisations"],
  },
] as const;

export type Expertise = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  intro: string;
  groups: { heading?: string; lead?: string; items: string[] }[];
};

export const EXPERTISES: Expertise[] = [
  {
    slug: "creation-reprise",
    index: "01",
    title: "Création & reprise",
    summary: "Choix du statut, prévisionnels et plans de financement, audit et évaluation de l’entreprise reprise.",
    intro:
      "La création d’une entreprise demande un projet bien structuré ; sa reprise, une bonne appréhension des comptes et du fonctionnement de l’entreprise à acquérir.",
    groups: [
      {
        heading: "Créer",
        lead: "Nous vous présentons les avantages et les inconvénients de chaque statut, vous conseillons sur la formule la mieux adaptée à votre situation personnelle et professionnelle, et facilitons le montage et le chiffrage de vos dossiers auprès des banques, prestataires et clients.",
        items: [
          "Aide au choix du statut juridique de l’entreprise",
          "Conseil sur le statut social du chef d’entreprise et de son conjoint",
          "Assistance à la rédaction des dossiers d’aide",
          "Comptes prévisionnels et plans de financement",
          "Conseils fiscal et social",
        ],
      },
      {
        heading: "Reprendre",
        lead: "Nous analysons l’ensemble des fonctions de l’entreprise pour évaluer ses actifs et ses passifs, définir la meilleure stratégie de reprise et identifier les besoins de financement du rachat et du développement.",
        items: [
          "Audit complet : comptable, fiscal, social et organisation interne",
          "Évaluation financière de l’entreprise",
          "Plans de financement",
          "Assistance au montage juridique et à l’acquisition des parts ou actions",
        ],
      },
    ],
  },
  {
    slug: "due-diligence",
    index: "02",
    title: "Due diligence",
    summary: "Une opinion synthétique sur les risques et les faiblesses d’une entreprise, avant de vous engager.",
    intro:
      "Pour vous forger une opinion synthétique des risques et des faiblesses d’une entreprise, nous réalisons des due diligences et des audits contractuels.",
    groups: [
      {
        items: [
          "Audit des comptes ou des situations intermédiaires",
          "Identification des risques fiscaux et sociaux",
          "Évaluation de l’endettement et de la consommation mensuelle de trésorerie",
        ],
      },
    ],
  },
  {
    slug: "controle-interne",
    index: "03",
    title: "Contrôle interne",
    summary: "Identifier les faiblesses, mettre en place les procédures, limiter les risques de fraude.",
    intro:
      "Pour structurer votre entreprise en période de croissance, nous identifions les faiblesses du contrôle interne et mettons en place les procédures qui limitent les risques, notamment de fraude, et précisent les responsabilités de chacun.",
    groups: [
      {
        items: [
          "Audit des procédures existantes : achats, ventes, trésorerie, informatique, stocks, personnel, comptabilité",
          "Mise en place de contrôles et définition des tâches",
          "Élaboration de manuels de procédures de contrôle interne",
        ],
      },
    ],
  },
  {
    slug: "pilotage-gestion",
    index: "04",
    title: "Pilotage & gestion",
    summary: "Situations mensuelles, tableaux de bord et reporting pour décider avec une visibilité quotidienne.",
    intro:
      "Pour gérer votre temps au mieux et prendre des décisions adéquates, nous vous aidons à piloter votre activité avec des conseils et des outils adaptés, qui vous donnent une visibilité quotidienne sur la marche de vos affaires.",
    groups: [
      {
        items: [
          "Tenue régulière de la comptabilité et situations comptables mensuelles",
          "Mise en place de tableaux de bord",
          "Mise en place de reporting",
          "Établissement de comptes consolidés",
        ],
      },
    ],
  },
  {
    slug: "transmission-cession",
    index: "05",
    title: "Transmission & cession",
    summary: "Diagnostic, évaluation et accompagnement jusqu’à la finalisation de votre projet.",
    intro:
      "Céder son entreprise ou son fonds de commerce suppose des informations fiables pour valoriser son patrimoine, négocier avec les repreneurs et finaliser son projet. Nous vous informons sur les différentes procédures de vente, vous conseillons sur le montage de votre dossier et établissons la valeur de votre entreprise.",
    groups: [
      {
        items: [
          "Assistance à la cession de parts ou de fonds de commerce",
          "Assistance à la transmission d’entreprise",
          "Diagnostic financier",
          "Évaluation financière des parts ou des actions",
          "Optimisation fiscale",
          "Assistance lors d’une donation",
        ],
      },
    ],
  },
  {
    slug: "reporting",
    index: "06",
    title: "Reporting",
    summary: "Reporting comptable et opérationnel, au format français, anglo-saxon ou propre à votre groupe.",
    intro:
      "Le reporting donne aux dirigeants et aux actionnaires une lecture fiable et régulière de l’activité. Nous l’élaborons au format qui vous est utile, et l’articulons avec vos outils de pilotage.",
    groups: [
      {
        items: [
          "Élaboration de reporting au format français, anglo-saxon ou propre à votre groupe",
          "Reporting comptable et opérationnel",
          "Tableaux de bord de pilotage",
          "Comptes consolidés",
        ],
      },
    ],
  },
];

export const PRINCIPLES = [
  {
    term: "Indépendance",
    text: "Aux sociétés cotées comme aux PME, PRAXOR offre la garantie d’un expert indépendant. Le commissaire aux comptes ne conseille pas les dirigeants : sa mission complète celle de l’expert-comptable, sans la dupliquer.",
  },
  {
    term: "Dialogue",
    text: "Nos missions sont conduites dans un souci constant de dialogue avec les dirigeants, de l’analyse du contrôle interne jusqu’aux inventaires de clôture.",
  },
  {
    term: "Transparence",
    text: "D’intérêt public, la mission du commissaire aux comptes apporte de la transparence dans le fonctionnement des organisations.",
  },
  {
    term: "Sécurité",
    text: "Étudier le circuit des données à leur source permet de formuler des recommandations qui en améliorent la sécurité.",
  },
  {
    term: "Qualité de l’information financière",
    text: "Des travaux menés par référence aux normes professionnelles, qui confèrent à l’information financière un gage de régularité et de sincérité, et la rendent crédible auprès des parties prenantes.",
  },
] as const;

export const SECTORS = [
  {
    name: "Services",
    text: "Services aéroportuaires, informatique, maintenance, transport, innovation.",
  },
  {
    name: "Internet & haute technologie",
    text: "Start-up internet, biotechnologies, services et produits innovants.",
  },
  {
    name: "Industrie",
    text: "Bâtiment, fourniture industrielle, construction mécanique, textile.",
  },
  {
    name: "Associations",
    text: "Économie sociale, associations de recherche, fédérations associatives.",
  },
  { name: "Distribution", text: "Distribution et logistique." },
  {
    name: "Audiovisuel & spectacle",
    text: "Spectacle, production et distribution audiovisuelle, littéraire et musicale.",
  },
  {
    name: "Finance",
    text: "Audit légal d’OPCVM et de sociétés du secteur bancaire, gestion des risques et gestion de patrimoine.",
  },
] as const;
