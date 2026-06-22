import type { Profile } from '../data/portfolio';

export const Introduction = ({ profile }: { profile: Profile }) => {
  return (
    <header>
      <h1>{profile.name}</h1>
      <p>{profile.title}</p>
    </header>
  );
};
