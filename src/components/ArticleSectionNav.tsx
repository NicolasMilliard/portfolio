import { useEffect, useRef, useState, type RefObject } from 'react';

type Section = {
  id: string;
  title: string;
};

type ArticleSectionNavProps = {
  contentRef: RefObject<HTMLDivElement | null>;
  articleKey: string;
};

export const ArticleSectionNav = ({
  contentRef,
  articleKey,
}: ArticleSectionNavProps) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const headings = Array.from(
      content.querySelectorAll<HTMLHeadingElement>('h2[id]'),
    );

    setSections(
      headings.map((heading) => ({
        id: heading.id,
        title:
          document.getElementById(`${heading.id}-title`)?.textContent?.trim() ||
          heading.textContent?.trim() ||
          heading.id,
      })),
    );
    setIsOpen(false);

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const readingLine = Math.min(window.innerHeight * 0.35, 240);
      let current = headings[0];

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > readingLine) break;
        current = heading;
      }

      const distanceToBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);

      const lastHeading = headings.at(-1);

      if (lastHeading && window.scrollY > 0 && distanceToBottom <= 2) {
        current = lastHeading;
      }

      setActiveId(current?.id ?? null);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', scheduleUpdate);

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(content);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('hashchange', scheduleUpdate);
      resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [contentRef, articleKey]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [isOpen]);

  if (sections.length < 2) return null;

  return (
    <nav
      ref={navRef}
      className="article-toc"
      aria-label="Article sections"
      data-open={isOpen}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
          const toggle = navRef.current?.querySelector<HTMLButtonElement>(
            '.article-toc-toggle',
          );

          if (toggle && getComputedStyle(toggle).display !== 'none') {
            toggle.focus();
          } else {
            (document.activeElement as HTMLElement | null)?.blur();
          }
        }
      }}
    >
      <button
        className="article-toc-toggle"
        type="button"
        aria-label={isOpen ? 'Hide article sections' : 'Show article sections'}
        aria-expanded={isOpen}
        aria-controls="article-toc-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true">☰</span>
        <span>Sections</span>
      </button>

      <div className="article-toc-rail">
        {sections.map((section) => (
          <a
            key={section.id}
            className="article-toc-mark"
            href={`#${section.id}`}
            aria-label={`Jump to ${section.title}`}
            aria-current={activeId === section.id ? 'location' : undefined}
          >
            <span aria-hidden="true" />
          </a>
        ))}
      </div>

      <div className="article-toc-panel" id="article-toc-panel">
        <div className="article-toc-card">
          <p className="article-toc-title">On this page</p>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={activeId === section.id ? 'location' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
};
