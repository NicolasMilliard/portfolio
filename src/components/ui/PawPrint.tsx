export const PawPrint = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M9 21c2-2 3-6 7-6s5 4 7 6c3 4 0 7-3 6-3-1-5-1-8 0-4 1-6-2-3-6Z"
      fill="currentColor"
    />
    <ellipse
      cx="7"
      cy="13"
      rx="3"
      ry="4"
      transform="rotate(-25 7 13)"
      fill="currentColor"
    />
    <ellipse
      cx="13"
      cy="7"
      rx="3"
      ry="4"
      transform="rotate(-8 13 7)"
      fill="currentColor"
    />
    <ellipse
      cx="21"
      cy="7"
      rx="3"
      ry="4"
      transform="rotate(12 21 7)"
      fill="currentColor"
    />
    <ellipse
      cx="27"
      cy="14"
      rx="3"
      ry="4"
      transform="rotate(28 27 14)"
      fill="currentColor"
    />
  </svg>
);
