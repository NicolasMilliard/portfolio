const arrowPaths = {
  right: ['M4 14Q15 12.5 31 14', 'M22 6L31 14L22 21'],
  'up-right': ['M5 23Q17 12 30 5', 'M18 5L30 4L29 17'],
} as const;

export const DrawnArrow = ({
  direction = 'right',
  className = '',
}: {
  direction?: keyof typeof arrowPaths;
  className?: string;
}) => (
  <svg
    className={`drawn-icon drawn-arrow ${className}`.trim()}
    viewBox="0 0 36 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {arrowPaths[direction].map((path) => (
      <path key={path} d={path} pathLength="1" />
    ))}
  </svg>
);
