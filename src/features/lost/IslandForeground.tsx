import './foreground.css';

export function IslandForeground() {
  return (
    <div className="island-foreground" aria-hidden="true">
      <div className="island-canopy">
        <img
          className="island-cutout"
          src="/images/lost/canopy-warm-v1-2000.webp"
          srcSet="/images/lost/canopy-warm-v1-1000.webp 1000w, /images/lost/canopy-warm-v1-2000.webp 2000w"
          sizes="calc(100vw + 40px)"
          width={2170}
          height={725}
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
            className={side === 'left' ? 'island-cutout' : undefined}
            src={
              side === 'left'
                ? '/images/lost/foreground-left-v1-900.webp'
                : '/images/lost/foreground-right-v1-900.webp'
            }
            srcSet={
              side === 'left'
                ? '/images/lost/foreground-left-v1-450.webp 450w, /images/lost/foreground-left-v1-900.webp 900w'
                : '/images/lost/foreground-right-v1-450.webp 450w, /images/lost/foreground-right-v1-900.webp 900w'
            }
            sizes={
              side === 'left'
                ? '(max-width: 640px) 205px, (max-width: 1470px) 32vw, 470px'
                : '(max-width: 640px) 200px, (max-width: 1530px) 30vw, 460px'
            }
            width={side === 'left' ? 1536 : 900}
            height={side === 'left' ? 1024 : 600}
            alt=""
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
