import React from "react";
import { useSearchParams } from "react-router-dom";
import { getActiveNotes } from "../utils/local-data";
import AddNoteButton from "../components/AddNoteButton";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList";
import NoteSearch from "../components/NoteSearch";
import NoteListEmpty from "../components/NoteListEmpty";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getActiveNotes(),
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
    const notes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
    );

    return (
      <div className="homepage">
        <h2>Active Notes</h2>
        <NoteSearch
          keyword={this.state.keyword || ""}
          keywordChange={this.onKeywordChangeHandler}
        />
        {notes.length > 0 && <NoteList notes={notes} />}
        {notes.length === 0 && <NoteListEmpty />}
        <AddNoteButton />
      </div>
    );
  }
}

HomePage.propTypes = {
  keywordChange: PropTypes.func.isRequired,
  defaultKeyword: PropTypes.string.isRequired,
};

export default HomePageWrapper;
