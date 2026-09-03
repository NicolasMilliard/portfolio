import { profile } from '../data/portfolio';

export const Introduction = () => {
  return (
    <header>
      <h1>{profile.name}</h1>
      <p>{profile.title}</p>
    </header>
  );
};
