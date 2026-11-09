import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import {
  createMemoryHistory,
  type AnyRouter,
  type RouterHistory,
} from '@tanstack/react-router';
import { defaultGetScrollRestorationKey } from '@tanstack/router-core';
import { createServer, type ViteDevServer } from 'vite';

let vite: ViteDevServer;
let createAppRouter: (history: RouterHistory) => AnyRouter;
let renderPage: (path: string) => Promise<string>;

before(async () => {
  vite = await createServer({
    appType: 'custom',
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false, ws: false },
  });
  ({ createAppRouter } = await vite.ssrLoadModule('/src/router.tsx'));
  ({ renderPage } = await vite.ssrLoadModule('/src/entry-server.tsx'));
});

after(async () => {
  await vite?.close();
});

test('Back and Forward retain separate scroll positions for homepage section visits', async () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const readVisit = async () => {
    // SSR routers read one history entry per load; each visit uses the app's configuration.
    const router = createAppRouter(history);
    await router.load();
    const location = router.state.location;
    const key = (
      router.options.getScrollRestorationKey ?? defaultGetScrollRestorationKey
    )(location);
    return { location, key };
  };
  const positions = new Map<string, number>();

  history.push('/#writing');
  const firstWritingKey = (await readVisit()).key;
  positions.set(firstWritingKey, 560);
  history.push('/#projects');
  const projectsKey = (await readVisit()).key;
  positions.set(projectsKey, 1200);
  history.push('/#writing');
  assert.notEqual((await readVisit()).key, firstWritingKey);

  history.back();
  const backToProjects = await readVisit();
  assert.equal(backToProjects.location.hash, 'projects');
  assert.equal(positions.get(backToProjects.key), 1200);
  history.back();
  const backToWriting = await readVisit();
  assert.equal(backToWriting.location.hash, 'writing');
  assert.equal(positions.get(backToWriting.key), 560);
  history.forward();
  const forwardToProjects = await readVisit();
  assert.equal(forwardToProjects.location.hash, 'projects');
  assert.equal(forwardToProjects.key, projectsKey);
});

test('homepage section links are not all announced as the current page', async () => {
  const html = await renderPage('/');
  const menu = html.match(/<nav aria-label="Main navigation">([\s\S]*?)<\/nav>/)?.[1];
  assert.ok(menu);
  assert.equal((menu.match(/aria-current=/g) ?? []).length, 0);
  for (const hash of ['writing', 'projects', 'connect']) {
    assert.ok(menu.includes(`href="/#${hash}"`));
  }
});
