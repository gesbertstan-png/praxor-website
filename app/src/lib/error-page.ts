export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Page indisponible | PRAXOR Audit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <style>
      body { font: 17px/1.6 "Helvetica Neue", Arial, sans-serif; background: #f5f5f2; color: #28303a; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 32rem; width: 100%; }
      h1 { font-size: 2rem; line-height: 1.1; letter-spacing: -0.02em; color: #0c1b2e; font-weight: 500; margin: 0 0 1rem; }
      p { color: #5b6470; margin: 0 0 2rem; }
      .actions { display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap; }
      a, button { font: inherit; cursor: pointer; text-decoration: none; }
      .primary { background: #0c1b2e; color: #f5f5f2; border: 0; padding: 0.9rem 1.5rem; }
      .secondary { color: #0c1b2e; border-bottom: 1px solid rgba(12,27,46,.32); }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Cette page n’a pas pu s’afficher.</h1>
      <p>Vous pouvez réessayer dans un instant, ou nous joindre au +33 (0)1 42 60 40 08.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Réessayer</button>
        <a class="secondary" href="/">Retour à l’accueil</a>
      </div>
    </div>
  </body>
</html>`;
}
