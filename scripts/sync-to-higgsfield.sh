#!/bin/bash
# Copies the site source from this GitHub branch into the Higgsfield website
# repository, runs inside the Higgsfield sandbox.
#   usage: sync-to-higgsfield.sh <higgsfield-checkout> [branch]
set -euo pipefail
HF="$1"; BRANCH="${2:-claude/praxor-audit-redesign-w7uo55}"
SRC=/home/user/praxor-src
rm -rf "$SRC"
git clone --quiet --depth 1 -b "$BRANCH" https://github.com/gesbertstan-png/praxor-website.git "$SRC"
A="$HF/app"; S="$SRC/app"

# App-template UI a marketing website does not use (Quanta layouts, generation widgets).
rm -rf "$A/src/layouts" "$A/src/assets" "$A/src/hooks" "$A/src/lib/api" "$A/public/presets"
rm -rf "$A/src/components" && mkdir -p "$A/src/components"

cp -R "$S/src/routes/." "$A/src/routes/"
cp -R "$S/src/components/." "$A/src/components/"
for f in site.ts seo.ts images.ts motion.ts error-page.ts error-capture.ts security-headers.server.ts higgsfield-error-reporting.ts; do
  cp "$S/src/lib/$f" "$A/src/lib/$f"
done
cp "$S/src/styles.css" "$S/src/server.ts" "$S/src/routeTree.gen.ts" "$S/src/app-meta.json" "$A/src/"
cp "$S/design-brief.md" "$A/design-brief.md"
mkdir -p "$A/public/fonts"
cp "$S/public/fonts/"* "$A/public/fonts/"
cp "$S/public/favicon.svg" "$S/public/favicon-32.png" "$S/public/apple-touch-icon.png" "$S/public/praxor-logo.svg" "$A/public/"
echo "synced from $BRANCH @ $(git -C "$SRC" rev-parse --short HEAD)"
