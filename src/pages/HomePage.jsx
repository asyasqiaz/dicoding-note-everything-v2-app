import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes } from "../utils/network-data";
import AddNoteButton from "../components/AddNoteButton";
import NoteList from "../components/NoteList";
import NoteSearch from "../components/NoteSearch";
import NoteListEmpty from "../components/NoteListEmpty";
import { LocaleConsumer } from "../contexts/LocaleContext";
import ClipLoader from "react-spinners/ClipLoader";
import ThemeContext from "../contexts/ThemeContext";

const override = {
  display: "block",
  margin: "0 auto",
};

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const [loading, setLoading] = useState(true);
  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
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
          <div className="homepage">
            <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
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
            <AddNoteButton />
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default HomePage;
