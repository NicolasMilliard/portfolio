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
