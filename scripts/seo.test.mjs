import assert from 'node:assert/strict';
import { test } from 'node:test';

import { botanicalSeo, homeSeo, renderSeoHead, seoToRouteHead } from '../src/seo.ts';

test('route and prerendered metadata agree on canonical URLs and document theme colors', () => {
  for (const [page, color] of [[botanicalSeo, '#d4c8b4'], [homeSeo, '#fbfcf7']]) {
    const client = seoToRouteHead(page);
    const html = renderSeoHead(page);
    const themeTags = client.meta.filter(meta => meta.name === 'theme-color');
    assert.deepEqual(themeTags, [{ name: 'theme-color', content: color }]);
    assert.equal((html.match(/name="theme-color"/g) ?? []).length, 1);
    assert.match(html, new RegExp(`name="theme-color" content="${color}"`));
    assert.deepEqual(client.links.find(link => link.rel === 'canonical'), {
      rel: 'canonical', href: page.canonicalUrl,
    });
    assert.ok(html.includes(`rel="canonical" href="${page.canonicalUrl}"`));
    assert.equal(client.meta.find(meta => meta.name === 'robots').content, page.robots);
    assert.ok(!page.robots.includes('noindex'));
  }
});
