import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/network-data";
import NoteSearch from "../components/NoteSearch";
import NoteList from "../components/NoteList";
import NoteListEmpty from "../components/NoteListEmpty";
import { LocaleConsumer } from "../contexts/LocaleContext";
import ClipLoader from "react-spinners/ClipLoader";
import ThemeContext from "../contexts/ThemeContext";

const override = {
  display: "block",
  margin: "0 auto",
};

function ArchivedNotePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const [loading, setLoading] = useState(true);
  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="archives-page">
            <h2>{locale === "id" ? "Catatan Arsip" : "Archived Notes"}</h2>
            <NoteSearch
              keyword={keyword || ""}
              keywordChange={onKeywordChangeHandler}
            />
            {notes.length > 0 && !loading ? (
              <NoteList notes={filteredNotes} />
            ) : (
              ""
            )}
            {notes.length === 0 && !loading ? <NoteListEmpty /> : ""}
            {loading ? (
              <ClipLoader
                color={theme === "light" ? "#3b3b3b" : "#fff"}
                loading={loading}
                size={150}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              ""
            )}
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default ArchivedNotePage;
