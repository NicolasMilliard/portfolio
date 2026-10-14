import { profile } from '../data/portfolio';

export const Introduction = () => {
  return (
    <header className="introduction">
      <img
        className="introduction-logo"
        src="/milliard-dev-logo.svg"
        alt=""
        width="44"
        height="39"
      />
      <div className="introduction-copy">
        <h1>{profile.name}</h1>
        <p>{profile.title}</p>
      </div>
    </header>
  );
};
