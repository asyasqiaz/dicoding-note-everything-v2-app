import React from "react";
import { MdCheck } from "react-icons/md";

function SaveNoteButton() {
  return (
    <button type="submit" className="action">
      <MdCheck size={42} />
    </button>
  );
}

export default SaveNoteButton;
