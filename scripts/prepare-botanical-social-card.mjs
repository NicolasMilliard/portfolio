import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'node_modules/.tmp/botanical-social-card.html');
const vite = await createServer({
  root,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false, ws: false },
});

try {
  const [{ GardenPlot }, { wildflowerGarden, strawberryGarden }] = await Promise.all([
    vite.ssrLoadModule('/src/features/botanical/GardenPlot.tsx'),
    vite.ssrLoadModule('/src/features/botanical/garden-data.tsx'),
  ]);
  const plots = [
    [wildflowerGarden, 'I. Wildflowers'],
    [strawberryGarden, 'II. Strawberries'],
  ].map(([garden, caption]) => renderToStaticMarkup(createElement(GardenPlot, {
    garden, caption, label: caption, flowerName: caption,
    plants: [], isFull: false, onPlant: () => {},
  }))).join('').replaceAll('viewBox="0 0 270 1100"', 'viewBox="0 40 270 760"');
  const styles = (await readFile(path.join(root, 'src/features/botanical/botanical.css'), 'utf8'))
    .replaceAll("url('./fonts/", "url('/src/features/botanical/fonts/");

  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>Botanical social card</title>
  <style>
    ${styles}
    * { box-sizing: border-box; }
    html, body { width: 1200px; min-width: 1200px; height: 630px; margin: 0; overflow: hidden; }
    .botanical-page.botanical-social-card {
      display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: 40px;
      align-items: center; width: 1200px; height: 630px; min-height: 0; padding: 60px;
      background: radial-gradient(ellipse at 25% 13%, #f1e9d8 0, #ede3d0 55%, #e6dcc8 100%);
    }
    .botanical-social-card::after {
      content: ''; position: absolute; inset: 14px; border: 1px solid #a99d8780;
    }
    .botanical-social-kicker { margin: 0 0 30px; color: #514b40; font: 13px var(--font-sans); letter-spacing: .2em; text-transform: uppercase; }
    .botanical-social-copy h1 { margin: 0 0 26px; font: 500 92px/.95 var(--font-serif); letter-spacing: -.035em; }
    .botanical-social-description { margin: 0; font: 28px/1.3 var(--font-serif); }
    .botanical-social-credit { margin: 42px 0 0; color: #514b40; font: italic 20px var(--font-serif); }
    .botanical-social-plots { display: grid; grid-template-columns: repeat(2, 180px); gap: 20px; }
    .botanical-page .botanical-social-plots .botanical-illustration { width: 180px; height: 510px; }
    .botanical-social-card * { animation: none !important; transition: none !important; }
    .botanical-social-card .botanical-flower-content { transform: none !important; filter: none !important; }
  </style>
</head>
<body>
  <main class="botanical-page botanical-social-card">
    <div class="botanical-social-copy">
      <p class="botanical-social-kicker">Hortus · No. 01</p>
      <h1>The Living<br />Garden</h1>
      <p class="botanical-social-description">An interactive botanical study<br />in paper, ink, and motion.</p>
      <p class="botanical-social-credit">Nicolas Milliard · milliard.dev/botanical</p>
    </div>
    <div class="botanical-social-plots">${plots}</div>
  </main>
</body>
</html>`);

  console.log('Prepared /node_modules/.tmp/botanical-social-card.html');
  console.log('Capture at a 1200 × 630 CSS-pixel viewport and save public/og/botanical.jpg.');
} finally {
  await vite.close();
}
