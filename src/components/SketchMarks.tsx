export const DrawnUnderline = () => (
  <svg
    className="drawn-underline"
    viewBox="0 0 180 12"
    preserveAspectRatio="none"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M2 8C39 3 105 4 177 6M18 10C65 7 119 7 159 9"
      pathLength="1"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

export const DrawnBox = () => (
  <svg
    className="drawn-box"
    viewBox="0 0 100 44"
    preserveAspectRatio="none"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M4 1.5C2.5 14 4.5 27 3 42"
      pathLength="1"
      vectorEffect="non-scaling-stroke"
    />
    <path
      d="M1 5C29 3.5 64 5.5 94 3"
      pathLength="1"
      vectorEffect="non-scaling-stroke"
    />
    <path
      d="M97 6.5C98.5 18 96 31 97.5 42.5"
      pathLength="1"
      vectorEffect="non-scaling-stroke"
    />
    <path
      d="M8 40C35 38.5 68 42 99 39.5"
      pathLength="1"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export const SketchRuler = () => (
  <svg
    className="sketch-ruler"
    viewBox="0 0 960 20"
    preserveAspectRatio="none"
    fill="none"
    aria-hidden="true"
    focusable="false"
    data-sketch
  >
    <path
      d="M1 3Q230 1 480 3T959 3"
      pathLength="1"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <path
      className="ruler-ticks"
      d={Array.from({ length: 79 }, (_, index) => {
        const x = (index + 1) * 12;
        return `M${x} 3l${index % 3 === 0 ? 0.4 : -0.3} ${index % 5 === 4 ? 12 : index % 5 === 1 ? 8 : 5}`;
      }).join('')}
      pathLength="1"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
    />
  </svg>
);

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
