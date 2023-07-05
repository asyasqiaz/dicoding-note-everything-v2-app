import React from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/network-data";
import PropTypes from "prop-types";
import NoteSearch from "../components/NoteSearch";
import NoteList from "../components/NoteList";
import NoteListEmpty from "../components/NoteListEmpty";

function ArchivedNotePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
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
    <div className="archives-page">
      <h2>Archived Notes</h2>
      <NoteSearch
        keyword={keyword || ""}
        keywordChange={onKeywordChangeHandler}
      />
      {notes.length > 0 && <NoteList notes={filteredNotes} />}
      {notes.length === 0 && <NoteListEmpty />}
    </div>
  );
}

export default ArchivedNotePage;
