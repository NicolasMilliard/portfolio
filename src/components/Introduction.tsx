import { profile } from '../data/portfolio';

export const Introduction = () => {
  return (
    <header className="introduction">
      <svg
        className="introduction-logo"
        width="44"
        height="39"
        viewBox="0 0 44 39"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <g className="logo-capsule-left">
          <rect
            x="15.817"
            y="2.31699"
            width="17"
            height="33"
            rx="8.5"
            transform="rotate(30 15.817 2.31699)"
            fill="#245BC3"
            fillOpacity="0.4"
            stroke="#245BC3"
          />
        </g>
        <g className="logo-capsule-right">
          <rect
            x="29.817"
            y="-0.683013"
            width="17"
            height="33"
            rx="8.5"
            transform="rotate(30 29.817 -0.683013)"
            fill="#245BC3"
            fillOpacity="0.4"
            stroke="#245BC3"
          />
        </g>
      </svg>
      <div className="introduction-copy">
        <h1>{profile.name}</h1>
        <p>{profile.title}</p>
      </div>
    </header>
  );
};
