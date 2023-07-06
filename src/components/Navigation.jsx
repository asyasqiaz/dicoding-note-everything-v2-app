import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout, MdOutlineStickyNote2 } from "react-icons/md";
import PropTypes from "prop-types";
import ToggleTheme from "./ToggleTheme";
import ToggleLocale from "./ToggleLocale";

function Navigation({ logout, name }) {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/archives">
            <button>
              <MdOutlineStickyNote2 size={30} />
            </button>
          </Link>
        </li>
        <li>
          <ToggleTheme />
        </li>
        <li>
          <ToggleLocale />
        </li>
        <li>
          <button onClick={logout}>
            <MdOutlineLogout size={30} />
            {name}
          </button>
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
