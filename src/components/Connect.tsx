import type { SocialLink } from '../data/portfolio';

const getSeparator = (index: number, total: number) => {
  if (index === 0) {
    return '';
  }

  if (index === total - 1) {
    return ', and ';
  }

  return ', ';
};

export const Connect = ({ links }: { links: SocialLink[] }) => {
  return (
    <section>
      <h2>connect</h2>
      <p>
        Find me on{' '}
        {links.map((link, index) => (
          <span key={link.label}>
            {getSeparator(index, links.length)}
            <a href={link.href}>{link.label}</a>
          </span>
        ))}
        .
      </p>
    </section>
  );
};
