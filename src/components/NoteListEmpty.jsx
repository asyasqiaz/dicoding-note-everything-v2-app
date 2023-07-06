import React from "react";
import { LocaleConsumer } from "../contexts/LocaleContext";

function NoteListEmpty() {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="notes-list-empty">
            <p>
              {locale === "id"
                ? "Tidak ada catatan saat ini"
                : "There is not any notes currently"}
            </p>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default NoteListEmpty;
