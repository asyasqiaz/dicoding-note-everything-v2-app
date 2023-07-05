import React from "react";
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

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { data } = await getNote(id);
      setNote(data);
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
