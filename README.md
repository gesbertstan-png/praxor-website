# PRAXOR Audit : site web

Refonte du site de PRAXOR Audit (expertise comptable, audit et commissariat aux comptes, conseil ; 12 rue du Helder, Paris 9e), construite avec le **Higgsfield Website Builder** : application React 19 + TanStack Start rendue côté serveur, déployée en Worker Cloudflare par Higgsfield.

## Organisation

| Dossier | Contenu |
|---|---|
| `app/src/routes/` | Pages : accueil, expertise comptable, audit, conseil, expertises, le cabinet, contact, mentions légales, `robots.txt`, `sitemap.xml` |
| `app/src/components/site/` | Composants : en-tête, pied de page, logo vectoriel, plan de situation, formulaire, etc. |
| `app/src/lib/site.ts` | Tous les textes et coordonnées (issus exclusivement de praxor.fr) |
| `app/src/lib/seo.ts` | Balises title/description/canonical/Open Graph et données structurées |
| `app/src/styles.css` | Design system : couleurs, typographie, grille, animations |
| `app/design-brief.md` | Brief de direction artistique |
| `scripts/` | Synchronisation vers Higgsfield, export des images, prévisualisation locale |

## Dépôt de production

Le site publié est construit depuis le dépôt Higgsfield du site (identifiant `557325ba-5228-4f13-9416-98dbeb8d8b9d`). Ce dépôt GitHub contient le code source ; les paquets vendorisés par Higgsfield, le lockfile et les photographies optimisées vivent dans le dépôt Higgsfield. `scripts/sync-to-higgsfield.sh` y copie le code, `scripts/build-images.py` y exporte les photographies en AVIF et WebP.

## Travailler en local

```bash
cd app && bun install && bunx vite build
node ../scripts/serve-dist.mjs            # http://127.0.0.1:4173
python3 ../scripts/make-local-placeholders.py   # images de substitution floues
```

`SITE_URL` dans `app/src/lib/site.ts` définit l'URL canonique : à remplacer par `https://praxor.fr` lorsque le domaine pointera vers ce site. Les anciennes URL de praxor.fr sont redirigées en 301 (`app/src/server.ts`).
