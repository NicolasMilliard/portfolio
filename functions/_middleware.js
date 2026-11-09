/**
 * Cloudflare Pages content negotiation: HTML and Markdown share the same page
 * URL. HTML is the default; clients can opt into Markdown via the Accept header.
 * scripts/prerender.ts generates the .md files; no conversion runs per request.
 */
const prefersMarkdown = (accept = '') => {
  const ranges = accept
    .toLowerCase()
    .split(',')
    .map((entry) => {
      const [type, ...parameters] = entry.trim().split(';');
      const quality = parameters.find((parameter) =>
        parameter.trim().startsWith('q='),
      );
      const q = quality ? Number(quality.trim().slice(2)) : 1;
      return {
        type: type.trim(),
        q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0,
      };
    });
  const quality = (type) => {
    // Specific ranges override wildcards, including an explicit q=0 refusal.
    for (const candidate of [type, 'text/*', '*/*']) {
      const matches = ranges.filter((range) => range.type === candidate);
      if (matches.length) return Math.max(...matches.map((range) => range.q));
    }
    return 0;
  };
  // Only explicit Markdown ranges opt in; ties with HTML favor Markdown.
  return (
    ranges.some((range) => range.type === 'text/markdown') &&
    quality('text/markdown') > 0 &&
    quality('text/markdown') >= quality('text/html')
  );
};

const varyOnAccept = (headers) => {
  const vary = headers.get('Vary') ?? '';
  if (
    !vary
      .split(',')
      .some((value) => ['accept', '*'].includes(value.trim().toLowerCase()))
  ) {
    headers.set('Vary', vary ? `${vary}, Accept` : 'Accept');
  }
};

const notFoundMarkdown = `# Page not found

The requested page does not exist on this website. You can continue from the [homepage](/), browse the [sitemap](/sitemap.xml), or read the [site guide](/llms.txt).
`;

export async function onRequest(context) {
  const { request } = context;
  // Resolve Pages first to preserve routing status and security headers.
  const response = await context.next();
  if (
    !['GET', 'HEAD'].includes(request.method) ||
    ![200, 404].includes(response.status) ||
    !response.headers
      .get('Content-Type')
      ?.toLowerCase()
      .startsWith('text/html') ||
    response.headers.get('cf-mitigated') === 'challenge'
  ) {
    return response;
  }

  const headers = new Headers(response.headers);
  varyOnAccept(headers);
  // Revalidate public pages so cached HTML isn't reused for a Markdown request.
  // Preserve existing private/no-store policies.
  if (response.status === 404) {
    headers.set('Cache-Control', 'no-store');
  } else if (
    !/(?:^|,)\s*(?:private|no-store)\b/i.test(
      headers.get('Cache-Control') ?? '',
    )
  ) {
    headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }
  if (!prefersMarkdown(request.headers.get('Accept') ?? '')) {
    return new Response(response.body, { status: response.status, headers });
  }

  let body = notFoundMarkdown;
  if (response.status === 200) {
    // Build artifacts follow page paths: / -> /index.md, /foo -> /foo.md.
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '');
    url.pathname = path ? `${path}.md` : '/index.md';
    url.search = '';
    const markdown = await context.env.ASSETS.fetch(
      new Request(url, { method: 'GET' }),
    );
    // Fall back to the real HTML if a representation is missing from a deployment.
    if (
      markdown.status !== 200 ||
      !markdown.headers.get('Content-Type')?.startsWith('text/markdown')
    ) {
      return new Response(response.body, { status: response.status, headers });
    }
    body = await markdown.text();
  } else {
    headers.set('X-Robots-Tag', 'noindex');
  }

  headers.set('Content-Type', 'text/markdown; charset=utf-8');
  // HTML byte lengths, compression, and validators don't apply to the new body.
  for (const name of [
    'Content-Length',
    'Content-Encoding',
    'ETag',
    'Last-Modified',
  ]) {
    headers.delete(name);
  }
  return new Response(request.method === 'HEAD' ? null : body, {
    status: response.status,
    headers,
  });
}
