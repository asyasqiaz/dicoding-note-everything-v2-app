import React from "react";
import { LocaleConsumer } from "../contexts/LocaleContext";
import { MdOutlineGTranslate } from "react-icons/md";

function ToggleLocale() {
  return (
    <LocaleConsumer>
      {({ toggleLocale }) => {
        return (
          <button className="toggle-locale" onClick={toggleLocale}>
            <MdOutlineGTranslate size={30} />
          </button>
        );
      }}
    </LocaleConsumer>
  );
}

export default ToggleLocale;
