import React from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/local-data";
import PropTypes from "prop-types";
import NoteSearch from "../components/NoteSearch";
import NoteList from "../components/NoteList";
import NoteListEmpty from "../components/NoteListEmpty";

function ArchivedNotePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <ArchivedNotePage
      defaultKeyword={keyword}
      keywordChange={changeSearchParams}
    />
  );
}

class ArchivedNotePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getArchivedNotes(),
      keyword: props.defaultKeyword || "",
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <div className="archives-page">
        <h2>Archived Notes</h2>
        <NoteSearch
          keyword={this.state.keyword || ""}
          keywordChange={this.onKeywordChangeHandler}
        />
        {notes.length > 0 && <NoteList notes={notes} />}
        {notes.length === 0 && <NoteListEmpty />}
      </div>
    );
  }
}

ArchivedNotePage.propTypes = {
  keywordChange: PropTypes.func.isRequired,
  defaultKeyword: PropTypes.string.isRequired,
};

export default ArchivedNotePageWrapper;
