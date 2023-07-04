import React from "react";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

function AddNoteButton() {
  return (
    <div className="homepage__action">
      <Link to={`/notes/new`}>
        <button className="action">
          <MdAdd size={42} />
        </button>
      </Link>
    </div>
  );
}

export default AddNoteButton;
