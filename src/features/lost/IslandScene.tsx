import { memo, type ReactNode } from 'react';

import './scene.css';

// A media source prevents hidden desktop plates downloading on phones (and vice versa).
const emptyImage =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

function DesktopPlate({
  name,
  priority = false,
}: {
  name: 'sea' | 'forest' | 'ground';
  priority?: boolean;
}) {
  return (
    <picture className="island-layer-picture" aria-hidden="true">
      <source media="(max-width: 640px)" srcSet={emptyImage} />
      <img
        className={name === 'sea' ? undefined : 'island-cutout'}
        src={`/images/lost/clearing-${name}-v1-1586.webp`}
        srcSet={`/images/lost/clearing-${name}-v1-1056.webp 1056w, /images/lost/clearing-${name}-v1-1586.webp 1586w`}
        sizes="(max-width: 1000px) 1100px, 103vw"
        width={1586}
        height={992}
        alt=""
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  );
}

export const IslandScene = memo(function IslandScene({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="island-scene">
      <svg
        className="island-alpha-defs"
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter
            id="island-cutout-alpha"
            x="0"
            y="0"
            width="1"
            height="1"
            colorInterpolationFilters="sRGB"
          >
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.06" intercept="-0.03" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      <div className="island-stage">
        <picture className="island-mobile-landscape" aria-hidden="true">
          <source media="(min-width: 641px)" srcSet={emptyImage} />
          <img
            src="/images/lost/clearing-mobile-v1-852.webp"
            srcSet="/images/lost/clearing-mobile-v1-480.webp 480w, /images/lost/clearing-mobile-v1-852.webp 852w"
            sizes="116vw"
            width={852}
            height={1846}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="island-depth island-depth-far" aria-hidden="true">
          <DesktopPlate name="sea" />
        </div>
        <div className="island-depth island-depth-background" aria-hidden="true">
          <DesktopPlate name="forest" priority />
          <div className="island-prop island-wreckage">
            <img
              className="island-cutout"
              src="/images/lost/fuselage-v1-960.webp"
              srcSet="/images/lost/fuselage-v1-480.webp 480w, /images/lost/fuselage-v1-960.webp 960w"
              sizes="(max-width: 640px) 60vw, 45vw"
              width={1536}
              height={1024}
              alt=""
              decoding="async"
            />
          </div>
        </div>
        <div className="island-depth island-depth-ground">
          <DesktopPlate name="ground" />
          {children}
        </div>
      </div>
      <div className="island-atmosphere" aria-hidden="true">
        <div className="island-light" />
        <div className="island-sunbeams" />
        <div className="island-fog" />
        <div className="island-shade" />
        <div className="island-grain" />
        {[
          ['72%', '19%'],
          ['84%', '31%'],
          ['77%', '43%'],
        ].map(([left, top], index) => (
          <i
            className="island-pollen"
            key={`pollen-${index}`}
            style={{
              left,
              top,
              animationDelay: `${-index * 8.3}s`,
              animationDuration: `${14 + index * 4}s`,
            }}
          />
        ))}
        {[
          ['20%', '56%'],
          ['86%', '62%'],
          ['75%', '79%'],
          ['33%', '72%'],
          ['14%', '80%'],
          ['91%', '44%'],
        ].map(([left, top], index) => (
          <i
            className="island-firefly"
            key={index}
            style={{
              left,
              top,
              animationDelay: `${-index * 2.7}s`,
              animationDuration: `${7 + index}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
});
