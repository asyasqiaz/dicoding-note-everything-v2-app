import React from "react";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes } from "../utils/network-data";
import AddNoteButton from "../components/AddNoteButton";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList";
import NoteSearch from "../components/NoteSearch";
import NoteListEmpty from "../components/NoteListEmpty";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
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
    <div className="homepage">
      <h2>Active Notes</h2>
      <NoteSearch
        keyword={keyword || ""}
        keywordChange={onKeywordChangeHandler}
      />
      {notes.length > 0 && <NoteList notes={filteredNotes} />}
      {notes.length === 0 && <NoteListEmpty />}
      <AddNoteButton />
    </div>
  );
}

export default HomePage;
