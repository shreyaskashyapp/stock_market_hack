import react from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Link to="/">
        <li className={location.pathname === "/" ? "nav-bar-active" : ""}>
          Home
        </li>
      </Link>

      <Link to="/compete">
        <li className={location.pathname === "/compete" ? "nav-bar-active" : ""}>
          Compete
        </li>
      </Link>

      <Link to="/learn">
      <li className={location.pathname === "/learn" ? "nav-bar-active" : ""}>
        Learn
      </li>
    </Link>
      

      <Link to="/Profile">
        <li className={location.pathname === "/profile" ? "nav-bar-active" : ""}>
          Profile
    </li>
      </Link>
    </nav>
  );
}