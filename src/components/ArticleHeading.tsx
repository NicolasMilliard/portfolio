import {
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';

const textFromChildren = (children: ReactNode): string => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(textFromChildren).join('');
  }

  if (isValidElement<{ children?: ReactNode }>(children)) {
    return textFromChildren(children.props.children);
  }

  return '';
};

const slugFromText = (text: string) =>
  text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const ArticleHeading = ({
  children,
  className,
  id,
  ...props
}: ComponentProps<'h2'>) => {
  const title = textFromChildren(children);
  const headingId = id || slugFromText(title);
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    },
    [],
  );

  const copyLink = async () => {
    const url = new URL(window.location.href);
    url.hash = headingId;

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <h2
      {...props}
      id={headingId}
      aria-labelledby={`${headingId}-title`}
      className={['article-section-heading', className].filter(Boolean).join(' ')}
    >
      <button
        className="article-heading-copy"
        type="button"
        aria-label={copied ? `Link copied: ${title}` : `Copy link to section: ${title}`}
        onClick={() => void copyLink()}
      >
        <span id={`${headingId}-title`}>{children}</span>
        <span className="article-heading-copy-icon" aria-hidden="true">
          {copied ? '✓' : '#'}
        </span>
      </button>
    </h2>
  );
};
