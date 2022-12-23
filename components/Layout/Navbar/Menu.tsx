import React from 'react';
import ButtonLink from '../../Buttons/ContactLink';
import { Link } from 'react-scroll';

const Menu = () => {
  return (
    <ul className="flex items-center">
      <Link
        activeClass="nm-active-link "
        to="about-me"
        smooth={true}
        spy={true}
        offset={-84}
        duration={300}
        className="mr-4 cursor-pointer nm-link sm:mr-8"
      >
        <li>about me</li>
      </Link>
      <Link
        activeClass="nm-active-link "
        to="projects"
        smooth={true}
        spy={true}
        offset={-84}
        duration={300}
        className="mr-4 cursor-pointer nm-link sm:mr-8"
      >
        <li>projects</li>
      </Link>
      <a
        href="images/resume/resume-nicolas-milliard.pdf"
        target="_blank"
        className="mr-4 sm:mr-8 nm-link"
      >
        <li>resume</li>
      </a>
      <ButtonLink text="contact me" additionalClasses="" />
    </ul>
  );
};

export default Menu;
