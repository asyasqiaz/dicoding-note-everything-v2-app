import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/network-data";
import ArchiveUnarchiveButton from "../components/ArchiveUnarchiveButton";
import DeleteButton from "../components/DeleteButton";
import NotFoundPage from "./NotFoundPage";
import NoteDetail from "../components/NoteDetail";
import ClipLoader from "react-spinners/ClipLoader";
import ThemeContext from "../contexts/ThemeContext";

const override = {
  display: "block",
  margin: "0 auto",
};

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    (async () => {
      const { data } = await getNote(id);
      setNote(data);
      setLoading(false);
    })();
  }, [id]);

  async function onDeleteHandler(id) {
    await deleteNote(id);
    navigate("/");
  }

  async function onArchiveHandler(id) {
    if (note.archived) {
      await unarchiveNote(id);
      navigate("/");
    } else {
      await archiveNote(id);
      navigate("/");
    }
  }

  return (
    <>
      {(() => {
        if (loading) {
          return (
            <ClipLoader
              color={theme === "light" ? "#3b3b3b" : "#fff"}
              loading={loading}
              size={150}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          );
        }
        if (note === null) {
          return <NotFoundPage />;
        }
        return (
          <>
            <NoteDetail {...note} />
            <div className="detail-page__action">
              <ArchiveUnarchiveButton
                id={id}
                onArchive={onArchiveHandler}
                isArchive={note.archived}
              />
              <DeleteButton id={id} onDelete={onDeleteHandler} />
            </div>
          </>
        );
      })()}
    </>
  );
}

export default NoteDetailPage;
