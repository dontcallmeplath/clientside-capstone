import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localYearbookUser = localStorage.getItem("yearbook_user");
    const yearbookUserObject = JSON.parse(localYearbookUser);
    setCurrentUser(yearbookUserObject.id);
  }, []);

  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link className="navbar__link" to="/">
          Class of 66
        </Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to={`/users/${currentUser}/profile`}>
          My Profile
        </Link>
      </li>
      {localStorage.getItem("yearbook_user") ? (
        <li className="navbar__item">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("yearbook_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
