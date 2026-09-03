import { profile } from '../data/portfolio';

export const About = () => {
  const about = profile.about;

  return (
    <section>
      <h2>about</h2>
      {about.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </section>
  );
};
