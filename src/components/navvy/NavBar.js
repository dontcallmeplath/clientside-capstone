import { Link, useParams } from "react-router-dom";

import "./NavBar.css";

export const NavBar = () => {
  const { userId } = useParams();
  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link className="navbar__link" to="/">
          Class of 66
        </Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to={`/users/${userId}/profile`}>
          My Profile
        </Link>
      </li>
    </ul>
  );
};
