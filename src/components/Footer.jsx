import React from "react";
import { LocaleConsumer } from "../contexts/LocaleContext";

const Footer = () => {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="note-app__footer">
            <p>
              &copy; 2023 —
              {locale === "id" ? " Catat Segalanya" : " Note Everything"}
            </p>
          </div>
        );
      }}
    </LocaleConsumer>
  );
};

export default Footer;
