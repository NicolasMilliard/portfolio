import { profile } from "../data/portfolio";
import { Companions } from "./Companions";

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
