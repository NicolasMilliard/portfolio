import './foreground.css';

export function IslandForeground() {
  return (
    <div className="island-foreground" aria-hidden="true">
      <div className="island-canopy">
        <img
          src="/images/lost/overhead-canopy-v1.png"
          srcSet="/images/lost/overhead-canopy-v1-800.png 800w, /images/lost/overhead-canopy-v1.png 1600w"
          sizes="calc(100vw + 40px)"
          width={1600}
          height={533}
          alt=""
          decoding="async"
        />
      </div>
      {(['left', 'right'] as const).map((side) => (
        <div
          key={side}
          className={`island-foreground-corner island-foreground-${side}`}
        >
          <img
            src="/images/lost/foreground-leaves.png"
            srcSet="/images/lost/foreground-leaves-450.png 450w, /images/lost/foreground-leaves.png 900w"
            sizes={
              side === 'left'
                ? '(max-width: 640px) 330px, (max-width: 1400px) 42vw, 590px'
                : '(max-width: 640px) 260px, (max-width: 1530px) 34vw, 520px'
            }
            width={900}
            height={600}
            alt=""
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
