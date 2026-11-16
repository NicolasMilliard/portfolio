import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

interface Section {
  id: string;
  title: string;
}

interface ArticleSectionNavProps {
  contentRef: RefObject<HTMLDivElement | null>;
  articleKey: string;
}

const sectionMarkPaths = [
  "M1.2 3.2Q7 2.7 12 3T22.8 2.8",
  "M1.2 2.8Q6.5 3.3 12 2.9T22.8 3.1",
  "M1.2 3.1Q8 2.8 13 3.2T22.8 2.9",
];

export const ArticleSectionNav = ({
  contentRef,
  articleKey,
}: ArticleSectionNavProps) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const content = contentRef.current;
    if (!content) {
      return;
    }

    const headings = [
      ...content.querySelectorAll<HTMLHeadingElement>("h2[id]"),
    ];

    setSections(
      headings.map((heading) => ({
        id: heading.id,
        title:
          document.getElementById(`${heading.id}-title`)?.textContent?.trim() ||
          heading.textContent?.trim() ||
          heading.id,
      }))
    );
    setIsOpen(false);

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const readingLine = Math.min(window.innerHeight * 0.35, 240);
      let [current] = headings;

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > readingLine) {
          break;
        }
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
      if (!frame) {
        // oxlint-disable-next-line react/immutability -- This frame handle belongs to the effect, not render state.
        frame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(content);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      resizeObserver.disconnect();
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
    // oxlint-disable-next-line react/exhaustive-effect-dependencies -- Article changes must rescan the new headings.
  }, [contentRef, articleKey]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [isOpen]);

  if (sections.length < 2) {
    return null;
  }

  return (
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- Delegates native anchor clicks and handles Escape for the section panel.
    <nav
      ref={navRef}
      className="article-toc"
      aria-label="Article sections"
      data-open={isOpen}
      onClick={(event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        const link = (event.target as HTMLElement).closest<HTMLAnchorElement>(
          'a[href^="#"]'
        );
        if (!link) {
          return;
        }

        // Keep the homepage origin while adding article sections to history.
        event.preventDefault();
        void router.navigate({
          to: "/writing/$slug",
          params: { slug: articleKey },
          hash: link.hash.slice(1),
          state: (previous) => ({
            homeHistoryIndex: previous.homeHistoryIndex,
          }),
        });
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setIsOpen(false);
          const toggle = navRef.current?.querySelector<HTMLButtonElement>(
            ".article-toc-toggle"
          );

          if (toggle && getComputedStyle(toggle).display !== "none") {
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
        aria-label={isOpen ? "Hide article sections" : "Show article sections"}
        aria-expanded={isOpen}
        aria-controls="article-toc-panel"
        onClick={() => {
          setIsOpen((open) => !open);
        }}
      >
        <span aria-hidden="true">☰</span>
        <span>Sections</span>
      </button>

      <div className="article-toc-rail">
        {sections.map((section, index) => (
          <a
            key={section.id}
            className="article-toc-mark"
            href={`#${section.id}`}
            aria-label={`Jump to ${section.title}`}
            aria-current={activeId === section.id ? "location" : undefined}
          >
            <svg
              viewBox="0 0 24 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d={sectionMarkPaths[index % sectionMarkPaths.length]} />
            </svg>
          </a>
        ))}
      </div>

      <div className="article-toc-panel" id="article-toc-panel">
        <div className="article-toc-card">
          <svg
            className="article-toc-outline"
            viewBox="0 0 280 340"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.85"
            strokeLinecap="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M4 2Q2 86 4 169T3 337" vectorEffect="non-scaling-stroke" />
            <path d="M2 5Q72 2 143 4T277 3" vectorEffect="non-scaling-stroke" />
            <path
              d="M277 2Q280 86 277 171T278 337"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M5 336Q82 333 145 336T278 334"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="article-toc-scroll">
            <p className="article-toc-title">On this page</p>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={
                      activeId === section.id ? "location" : undefined
                    }
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </nav>
  );
};
