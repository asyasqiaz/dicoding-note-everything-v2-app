import React from "react";
import { addNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";
import NoteInput from "../components/NoteInput";

function AddNotePage() {
  const navigate = useNavigate();

  async function onAddNoteHandler(note) {
    await addNote(note);
    navigate("/");
  }

  return (
    <div className="add-new-page">
      <NoteInput addNote={onAddNoteHandler} />
    </div>
  );
}

export default AddNotePage;
