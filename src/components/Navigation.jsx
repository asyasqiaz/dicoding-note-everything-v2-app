import React from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineLogout,
  MdOutlineTranslate,
  MdOutlineLightMode,
  MdOutlineDarkMode,
} from "react-icons/md";
import PropTypes from "prop-types";

function Navigation({ logout, name }) {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/archives">Archives</Link>
        </li>
        <li>
          <button>
            <MdOutlineTranslate size={30} />
          </button>
        </li>
        <li>
          <button>
            <MdOutlineLightMode size={30} />
          </button>
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
