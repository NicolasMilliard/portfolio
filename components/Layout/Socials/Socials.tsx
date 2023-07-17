import { FC } from 'react';
import SocialLinks from './SocialLinks';

import github from '../../../public/images/icons/github-green.svg';
import twitter from '../../../public/images/icons/twitter-green.svg';
import linkedin from '../../../public/images/icons/linkedin-green.svg';

const Socials: FC = () => {
  return (
    <div className="hidden md:block">
      <div className="fixed top-0 left-9999 z-40 h-full">
        <div className="flex flex-col justify-center h-full">
          <SocialLinks
            link="https://github.com/NicolasMilliard"
            imageSource={github}
            imageText="GitHub"
          />
          <SocialLinks
            link="https://twitter.com/NicolasMilliard"
            imageSource={twitter}
            imageText="Twitter"
          />
          <SocialLinks
            link="https://www.linkedin.com/in/nicolas-milliard/"
            imageSource={linkedin}
            imageText="LinkedIn"
          />
        </div>
      </div>
    </div>
  );
};

export default Socials;
