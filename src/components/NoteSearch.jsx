import React from "react";
import PropTypes from "prop-types";

function NoteSearch({ keyword, keywordChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search note..."
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
}

NoteSearch.propType = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default NoteSearch;
