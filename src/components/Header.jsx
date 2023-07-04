import React from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="note-app__header">
      <h1>
        <Link to="/">Note Everything</Link>
      </h1>
      <Navigation />
    </header>
  );
};

export default Header;
