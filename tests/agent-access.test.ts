import assert from 'node:assert/strict';
import test from 'node:test';

import { onRequest } from '../functions/_middleware.js';
import { renderLlms, renderMarkdown } from '../scripts/agent-content.ts';

type ServeOptions = {
  path?: string;
  accept?: string;
  method?: string;
  status?: number;
  contentType?: string;
  headers?: Record<string, string>;
  markdownStatus?: number;
};

const serve = ({
  path = '/',
  accept = 'text/markdown',
  method = 'GET',
  status = 200,
  contentType = 'text/html; charset=utf-8',
  headers = {},
  markdownStatus = 200,
}: ServeOptions = {}): { response: Promise<Response>; fetched: string[] } => {
  const fetched: string[] = [];
  const context = {
    request: new Request(`https://milliard.dev${path}`, {
      method,
      headers: { Accept: accept },
    }),
    next: async () =>
      new Response('<h1>Nicolas Milliard</h1>', {
        status,
        headers: { 'Content-Type': contentType, ...headers },
      }),
    env: {
      ASSETS: {
        fetch: async (request: Request) => {
          fetched.push(request.url);
          return new Response('# Nicolas Milliard\n\nPortfolio content.\n', {
            status: markdownStatus,
            headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
          });
        },
      },
    },
  };
  return { response: onRequest(context), fetched };
};

test('serves Markdown on canonical URLs, retaining security headers and dropping HTML validators', async () => {
  const { response, fetched } = serve({
    path: '/writing/example?ref=profile',
    headers: {
      Vary: 'Accept-Encoding',
      ETag: '"html-version"',
      'Last-Modified': 'Wed, 04 Nov 2026 00:00:00 GMT',
      'Content-Length': '25',
      'X-Content-Type-Options': 'nosniff',
    },
  });
  const result = await response;
  assert.equal(result.status, 200);
  assert.match(result.headers.get('Content-Type')!, /^text\/markdown/);
  assert.equal(result.headers.get('Vary'), 'Accept-Encoding, Accept');
  assert.equal(result.headers.get('ETag'), null);
  assert.equal(result.headers.get('Last-Modified'), null);
  assert.equal(result.headers.get('Content-Length'), null);
  assert.equal(result.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.match(await result.text(), /^# Nicolas Milliard/);
  assert.deepEqual(fetched, ['https://milliard.dev/writing/example.md']);
});

test('honors explicit preferences and defaults to HTML for browsers and wildcard requests', async () => {
  const cases: [string, boolean][] = [
    ['text/markdown', true],
    ['TEXT/MARKDOWN; charset=utf-8', true],
    ['text/markdown, text/html;q=0.8', true],
    ['text/html;q=0, text/markdown;q=0.8', true],
    ['text/markdown;q=0, */*;q=1', false],
    ['text/markdown;q=0.5, text/html', false],
    ['text/markdown;q=invalid', false],
    ['text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', false],
    ['*/*', false],
    ['', false],
  ];
  for (const [accept, markdown] of cases) {
    const { response } = serve({ accept });
    const result = await response;
    assert.equal(
      result.headers.get('Content-Type')!.startsWith('text/markdown'),
      markdown,
      accept,
    );
    assert.equal(result.headers.get('Vary'), 'Accept', accept);
    assert.match(
      await result.text(),
      markdown ? /^# Nicolas/ : /^<h1>/,
      accept,
    );
  }
});

test('negotiates the homepage and trailing slashes to the built Markdown assets', async () => {
  for (const [path, expected] of [
    ['/', '/index.md'],
    ['/privacy/', '/privacy.md'],
  ]) {
    const { response, fetched } = serve({ path });
    assert.equal((await response).status, 200);
    assert.deepEqual(fetched, [`https://milliard.dev${expected}`]);
  }
});

test('preserves 404 status with a Markdown explanation and recovery links', async () => {
  const { response, fetched } = serve({ path: '/missing', status: 404 });
  const result = await response;
  assert.equal(result.status, 404);
  assert.match(result.headers.get('Content-Type')!, /^text\/markdown/);
  assert.equal(result.headers.get('Cache-Control'), 'no-store');
  assert.equal(result.headers.get('X-Robots-Tag'), 'noindex');
  assert.match(
    await result.text(),
    /Page not found[\s\S]*\[site guide\]\(\/llms.txt\)/,
  );
  assert.deepEqual(fetched, []);
});

test('keeps HTML 404s, redirects, non-HTML assets, and real challenge responses intact', async () => {
  const cases: ServeOptions[] = [
    { status: 404, accept: 'text/html' },
    { status: 302, headers: { Location: '/privacy' } },
    { contentType: 'text/plain' },
    { headers: { 'cf-mitigated': 'challenge' } },
    { method: 'POST' },
  ];
  for (const options of cases) {
    const { response, fetched } = serve(options);
    const result = await response;
    assert.equal(result.status, options.status ?? 200);
    assert.equal(
      result.headers.get('Content-Type'),
      options.contentType ?? 'text/html; charset=utf-8',
    );
    assert.equal(await result.text(), '<h1>Nicolas Milliard</h1>');
    assert.deepEqual(fetched, []);
  }
});

test('HEAD returns Markdown headers without a response body', async () => {
  const { response } = serve({ method: 'HEAD' });
  const result = await response;
  assert.match(result.headers.get('Content-Type')!, /^text\/markdown/);
  assert.equal(await result.text(), '');
});

test('negotiation does not make private or uncacheable pages publicly cacheable', async () => {
  for (const accept of ['text/html', 'text/markdown']) {
    for (const policy of ['private, max-age=0', 'no-store']) {
      const { response } = serve({
        accept,
        headers: { 'Cache-Control': policy },
      });
      assert.equal((await response).headers.get('Cache-Control'), policy);
    }
  }
});

test('a missing generated Markdown representation does not hide a valid HTML page', async () => {
  const { response } = serve({ markdownStatus: 404 });
  const result = await response;
  assert.equal(result.status, 200);
  assert.match(result.headers.get('Content-Type')!, /^text\/html/);
  assert.equal(result.headers.get('Vary'), 'Accept');
  assert.match(await result.text(), /<h1>Nicolas/);
});

test('Markdown retains article headings, code, and images without interactive duplicates', () => {
  const markdown = renderMarkdown(
    `
    <header class="site-header">
      <a href="/"><img src="/logo.png" alt="">Nicolas Milliard</a>
    </header>
    <header class="article-header"><h1>Article</h1></header>
    <nav>Browser navigation</nav>
    <h2><button>Example<span aria-hidden="true">#</span></button></h2>
    <p><a href="/writing/other">Related article</a></p>
    <figure><button><img src="/images/example.png" alt="Workflow"></button>
      <dialog><img src="/images/example.png" alt="Duplicate"></dialog></figure>
    <pre><code data-language="js">const fence = '\x60\x60\x60';\n</code></pre>
    <script>browserOnly()</script>
  `,
    'https://milliard.dev/writing/example',
  );
  assert.match(markdown, /^# Article/);
  assert.match(markdown, /## Example/);
  assert.match(
    markdown,
    /\[Related article\]\(https:\/\/milliard.dev\/writing\/other\)/,
  );
  assert.match(
    markdown,
    /!\[Workflow\]\(https:\/\/milliard.dev\/images\/example.png\)/,
  );
  assert.match(markdown, /````js\nconst fence = '```';\n````/);
  assert.doesNotMatch(
    markdown,
    /Browser navigation|Duplicate|browserOnly|Example#|Nicolas Milliard|logo\.png/,
  );
});

test('Markdown separates the labels and descriptions of visually laid-out portfolio cards', () => {
  const markdown = renderMarkdown(
    `
    <a class="project-link" href="https://3bio.social/">
      <span class="project-title">3bio</span><span class="project-description">A shareable page.</span>
    </a><a class="writing-link" href="/writing/example">
      <span class="writing-title">An article</span><time>November 5, 2026</time><span class="writing-description">A real decision.</span>
    </a>
  `,
    'https://milliard.dev/',
  );
  assert.match(
    markdown,
    /\[3bio\]\(https:\/\/3bio.social\/\)\n\nA shareable page\./,
  );
  assert.match(
    markdown,
    /\[An article\]\(https:\/\/milliard.dev\/writing\/example\) — November 5, 2026\n\nA real decision\./,
  );
  assert.doesNotMatch(markdown, /3bioA|articleNovember/);
});

test('agent guidance describes use cases and includes the supplied published pages', () => {
  const guide = renderLlms({
    profile: {
      name: 'Nicolas Milliard',
      title: 'Frontend Engineer',
      about: ['Frontend architecture.'],
    },
    pages: [
      {
        path: '/privacy',
        title: 'Privacy',
        description: 'Privacy information.',
      },
    ],
    writings: [
      {
        slug: 'published-article',
        title: 'Published article',
        description: 'An engineering decision.',
      },
    ],
    projects: [],
    origin: 'https://milliard.dev',
  });
  assert.match(guide, /## When to use this site/);
  assert.match(guide, /https:\/\/milliard.dev\/privacy/);
  assert.match(guide, /https:\/\/milliard.dev\/writing\/published-article/);
  assert.match(guide, /Accept: text\/markdown/);
});
