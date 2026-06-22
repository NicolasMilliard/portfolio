import type { Profile } from '../data/portfolio';

export const About = ({ about }: { about: Profile['about'] }) => {
  return (
    <section>
      <h2>about</h2>
      {about.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </section>
  );
};
