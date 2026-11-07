import TurndownService from 'turndown';

import type { InformationPage } from '../src/content/information.ts';
import type { Writing } from '../src/content/writings.ts';
import type { Profile, Project } from '../src/data/portfolio.ts';

export const renderMarkdown = (html: string, canonicalUrl: string) => {
  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
  });

  const omittedTags = ['script', 'style', 'svg', 'nav', 'dialog', 'footer'];
  turndown.remove((node) => omittedTags.includes(node.nodeName.toLowerCase()));
  turndown.remove((node) => node.getAttribute('aria-hidden') === 'true');
  turndown.addRule('absoluteLinks', {
    filter: (node) => node.nodeName === 'A' && node.hasAttribute('href'),
    replacement: (content, node) => {
      const url = new URL(node.getAttribute('href')!, canonicalUrl).href
        .replaceAll('(', '%28')
        .replaceAll(')', '%29');
      const title = node.querySelector('.writing-title, .project-title');
      if (title) {
        const description = node.querySelector(
          '.writing-description, .project-description',
        );
        const date = node.querySelector('time');
        return `\n\n[${title.textContent}](${url})${date ? ` — ${date.textContent}` : ''}\n\n${description?.textContent ?? ''}\n\n`;
      }
      return `[${content}](${url})`;
    },
  });
  turndown.addRule('absoluteImages', {
    filter: 'img',
    replacement: (_content, node) => {
      const src = node.getAttribute('src');
      if (!src) return '';
      const alt = (node.getAttribute('alt') ?? '').replaceAll(']', '\\]');
      const url = new URL(src, canonicalUrl).href
        .replaceAll('(', '%28')
        .replaceAll(')', '%29');
      return `![${alt}](${url})`;
    },
  });
  turndown.addRule('highlightedCode', {
    filter: (node) =>
      node.nodeName === 'PRE' && node.firstChild?.nodeName === 'CODE',
    replacement: (_content, node) => {
      // This rule's filter guarantees that the first child is a CODE element.
      const code = node.firstChild as HTMLElement;
      const language =
        code.getAttribute('data-language') ??
        /language-(\S+)/.exec(code.className)?.[1] ??
        '';
      const text = (code.textContent ?? '').replace(/\n$/, '');
      const longestFence = Math.max(
        2,
        ...(text.match(/`+/g) ?? []).map((value) => value.length),
      );
      const fence = '`'.repeat(longestFence + 1);
      return `\n\n${fence}${language}\n${text}\n${fence}\n\n`;
    },
  });

  return `${turndown.turndown(html)}\n\nCanonical URL: ${canonicalUrl}\n`;
};

export const renderLlms = ({
  profile,
  pages,
  writings,
  projects,
  origin,
}: {
  profile: Profile;
  pages: Pick<InformationPage, 'path' | 'title' | 'description'>[];
  writings: Pick<Writing, 'slug' | 'title' | 'description'>[];
  projects: Project[];
  origin: string;
}) => {
  const absolute = (path: string) => new URL(path, origin).href;
  return `# ${profile.name}

> ${profile.about.join(' ')}

## When to use this site

- Learn about Nicolas Milliard's frontend engineering experience, technical interests, and projects.
- Find first-hand explanations of frontend architecture, data deletion, and practical automation decisions in his published articles.
- Cite the relevant article's canonical URL when referring to an experience or decision described there.
- Find Nicolas's professional profiles linked from the portfolio.

## Pages

- [Portfolio](${absolute('/')}): Experience, projects, published writing, and social profiles.
${pages.map((page) => `- [${page.title}](${absolute(page.path)}): ${page.description}`).join('\n')}

## Writing

${writings.map((writing) => `- [${writing.title}](${absolute(`/writing/${writing.slug}`)}): ${writing.description}`).join('\n')}

## Projects

${projects.map((project) => `- [${project.title}](${project.link}): ${project.description}`).join('\n')}

## Reading content

Request a page with the Accept: text/markdown header to read its Markdown representation at the same URL. HTML remains available with Accept: text/html. Missing pages keep HTTP 404 and include recovery links in Markdown when requested.

The [sitemap](${absolute('/sitemap.xml')}) lists the published pages. Article publication and update dates appear on the articles themselves.
`;
};
