export const observeSectionReveals = (page: HTMLDivElement | null) => {
  if (!page) {
    return;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    return;
  }

  const sections = page.querySelectorAll<HTMLElement>(':scope > main > section');
  const pending = new Set(sections);
  const observer = new IntersectionObserver(
    (entries) => {
      let stagger = 0;

      for (const entry of entries) {
        const section = entry.target as HTMLElement;

        if (!entry.isIntersecting || !pending.delete(section)) {
          continue;
        }

        section.style.setProperty(
          '--reveal-delay',
          `${Math.min(stagger, 2) * 70}ms`,
        );
        section.dataset.reveal = 'visible';
        observer.unobserve(section);
        stagger += 1;
      }

      if (pending.size === 0) {
        observer.disconnect();
      }
    },
    // A small inset gives the entrance room to breathe, even for tall sections.
    { rootMargin: '0px 0px -24px 0px', threshold: 0 },
  );

  const resetSection = (section: HTMLElement) => {
    delete section.dataset.reveal;
    section.style.removeProperty('--reveal-delay');
  };

  const handleFocus = (event: FocusEvent) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const section = event.target.closest<HTMLElement>('section[data-reveal]');

    if (section) {
      // Keyboard navigation must never wait for an entrance animation.
      resetSection(section);
      pending.delete(section);
      observer.unobserve(section);

      if (pending.size === 0) {
        observer.disconnect();
      }
    }
  };

  for (const section of sections) {
    section.dataset.reveal = 'pending';
    observer.observe(section);
  }

  const cleanup = () => {
    observer.disconnect();
    pending.clear();
    page.removeEventListener('focusin', handleFocus);
    reducedMotion.removeEventListener('change', cleanup);
    sections.forEach(resetSection);
  };

  page.addEventListener('focusin', handleFocus);
  reducedMotion.addEventListener('change', cleanup);

  // React's callback-ref cleanup also runs on navigation and StrictMode remounts.
  return cleanup;
};
