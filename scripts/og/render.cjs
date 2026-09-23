// Renders the typography layer of the social card (1200x630) and the cover
// (1500x1000) from card.html as PNGs whose photo area is transparent; the
// Higgsfield sandbox then places the photograph underneath (compose.py).
// Usage: node render.cjs <outdir> [chromiumPath]
const path = require("path");
const fs = require("fs");
let pw;
try { pw = require("playwright-core"); } catch { pw = require("playwright"); }
(async () => {
  const [outdir, exe] = process.argv.slice(2);
  const tpl = fs.readFileSync(path.join(__dirname, "card.html"), "utf8");
  const tmp = path.join(__dirname, "_card.html");
  fs.writeFileSync(tmp, tpl);
  const browser = await pw.chromium.launch(exe ? { executablePath: exe } : {});
  const formats = [
    { name: "og-layer.png", w: 1200, h: 630, vars: "--w:1200px;--h:630px;--img:440px;--pad:64px;--logo:190px;--fs:66px;--mono:17px" },
    { name: "cover-layer.png", w: 1500, h: 1000, vars: "--w:1500px;--h:1000px;--img:560px;--pad:84px;--logo:240px;--fs:92px;--mono:21px" },
  ];
  for (const f of formats) {
    const page = await browser.newPage({ viewport: { width: f.w, height: f.h } });
    await page.goto("file://" + tmp);
    await page.addStyleTag({ content: `:root{${f.vars}}` });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outdir, f.name), omitBackground: true });
    await page.close();
  }
  await browser.close();
  fs.unlinkSync(tmp);
})();
