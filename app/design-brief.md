# PRAXOR Audit : brief de conception

## Design read
Dirigeants de PME, d'ETI et de sociétés cotées qui choisissent un expert-comptable ou un commissaire aux comptes à Paris. Registre : institutionnel, calme, précis, humain. Un cabinet parisien établi, présenté avec les codes d'un cabinet de conseil contemporain.

## Concept spine : « le plan et la mesure »
Le site se lit comme un jeu de plans d'architecte d'un immeuble haussmannien : grille visible en filets très fins, cotes et index en chiffres, coordonnées géographiques, un plan de quartier tracé au trait. La précision graphique répond à la précision du métier (régularité, sincérité de l'information financière).

## Delivery tier
`editorial` : typographie, grille, filets, trois photographies d'architecture. Micro-mouvements uniquement (révélation de filets, montée de 12 à 16 px, compteurs, survols). Pas de smooth-scroll détourné, pas de parallaxe, pas de vidéo.

Animation mode: non-animated — « Ne pas faire : animation 3D gratuite, énorme parallaxe, […] vidéos de fond distrayantes. Le visiteur doit ressentir la fluidité sans forcément remarquer les animations. »

## Palette verrouillée (couleurs issues du logo PRAXOR)
| Rôle | Hex |
|---|---|
| Papier (fond) | `#F5F5F2` |
| Papier teinté | `#ECECE7` |
| Bleu nuit (titres, sections sombres) | `#0C1B2E` |
| Anthracite (texte courant) | `#28303A` |
| Gris secondaire | `#5B6470` (5,5:1 sur papier) |
| Texte sur nuit | `#F1F1EC` / `#9AA7B8` (7,1:1) |
| Accent (logo, usage parcimonieux) | `#E74C26`, variante texte `#C23A17` |

Défense : le bleu nuit et le blanc cassé donnent l'autorité institutionnelle ; le vermillon est celui du paraphe du logo existant et n'apparaît qu'en signe (point final, index au survol, pastille du plan, anneau de focus).

## Typographie verrouillée
- Instrument Sans (variable, 400 à 700), auto-hébergée : grotesque contemporaine, lisible, aux proportions serrées qui évoquent l'architecture et la finance. Titres en 440 à 480, interlettrage négatif, très fort contraste d'échelle.
- IBM Plex Mono 400 : index, coordonnées, métadonnées. Donne la sensation d'instrument de mesure.
- Pas de serif : l'autorité vient de l'échelle et de la grille.

## Section plan (accueil)
1. Hero : split asymétrique, H1 sur 3 lignes à gauche, façade haussmannienne en portrait à droite, filets de grille.
2. Depuis 1975 (papier teinté) : « Depuis 1975 » en chiffres monumentaux, phrase institutionnelle, puis 3 chiffres clés (3 associés, +60 ans d'expérience cumulée des associés, PME → cotées) et les inscriptions professionnelles.
3. Nos métiers : intro titre / chapô sur deux colonnes, index de lignes pleine largeur (01, 02, 03).
4. Approche (papier teinté) : déclaration, chapô et liste à gauche, photo parquet étirée à la même hauteur à droite.
5. Expertises : tableau à filets 3 x 2, index et flèche sur la même ligne.
6. Philosophie de l'audit : bleu nuit, colonne collante à gauche, cinq principes mis en valeur au défilement.
7. Paris : bandeau toits de zinc, adresse en grand corps et plan de quartier au trait.
8. Appel final + pied de page : bloc bleu nuit continu.

## Règles de rythme (passe « aucun vide inutile »)
- `--section: clamp(52px, 6vw, 88px)` ; `--intro-gap: clamp(28px, 3.2vw, 48px)`. Deux sections de même fond ne cumulent jamais plus de ~170 px ; les sections alternent papier, papier teinté et bleu nuit.
- Aucune hauteur artificielle (`min-height`, `100vh`) : chaque section prend la hauteur de son contenu. Les photos d'accompagnement s'étirent à la hauteur de la colonne de texte.
- Colonnes : un titre de colonne gauche est collant ou accompagné de contenu (registre, liste, chapô) ; pas de colonne vide sous un titre court.
- Contrôle automatique : aucune bande d'une seule couleur de plus de 140 px (desktop, laptop) ou 120 px (tablette, mobile).
- Faits : « Depuis 1975 » = création du cabinet ; « +60 ans » = expérience cumulée des trois associés. Les deux ne sont jamais confondus. SIREN, forme juridique et code APE restent dans « Le cabinet », les mentions légales, le pied de page et les données structurées.

## Asset plan
Trois photographies générées avec Higgsfield (gpt_image_2_5, 2K), sans personnes ni texte :
- `facade` : détail de façade haussmannienne, pierre et ferronnerie (hero, page Cabinet, bandeau Audit).
- `parquet` : parquet point de Hongrie et rectangle de lumière (Approche, bandeau Expertise comptable).
- `toits` : toits de zinc du 9e arrondissement (Paris, bandeau Conseil).
Logo : SVG vectoriel d'origine récupéré sur praxor.fr, décliné en version claire et foncée. Favicon SVG dérivé du monogramme. Image OG composée à partir de la façade et du logo.

## CTA inventory
- En-tête « Nous contacter » : rectangle filet bleu nuit, remplissage par le bas au survol.
- Hero « Découvrir nos expertises » : bloc bleu nuit plein, flèche qui s'allonge.
- Hero « Nous contacter » : lien texte, soulignement qui se trace.
- Métiers « Découvrir » : ligne entière cliquable, balayage de fond, index vermillon.
- Expertises : cellule entière cliquable, filet vermillon qui se trace en tête de cellule.
- Appel final « Contacter PRAXOR » : grand bloc papier sur nuit, flèche qui glisse.
- Formulaire « Préparer mon message » : bloc plein, état de chargement et de validation.
