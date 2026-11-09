import { Companions } from './Companions';

import { profile } from '../data/portfolio';

export const Footer = () => (
  <footer>
    <div className="site-footer">
      <p>
        {profile.name}
        <span aria-hidden="true"> · </span>
        <span>Thanks for stopping by.</span>
      </p>
    </div>
    <Companions />
  </footer>
);
