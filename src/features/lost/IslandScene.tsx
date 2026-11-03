import { memo } from 'react';

export const IslandScene = memo(function IslandScene() {
  return (
    <div className="island-scene" aria-hidden="true">
      <picture className="island-landscape">
        <source
          media="(max-width: 640px)"
          srcSet="/images/lost/island-mobile.jpg"
        />
        <img
          src="/images/lost/island-desktop.jpg"
          srcSet="/images/lost/island-desktop-1280.jpg 1280w, /images/lost/island-desktop.jpg 1672w"
          sizes="100vw"
          width={1672}
          height={941}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="island-light" />
      <div className="island-fog" />
      <div className="island-shade" />
      <div className="island-grain" />
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
  );
});
