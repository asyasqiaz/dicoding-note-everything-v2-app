import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/local-data";
import ArchiveUnarchiveButton from "../components/ArchiveUnarchiveButton";
import DeleteButton from "../components/DeleteButton";
import NotFoundPage from "./NotFoundPage";
import NoteDetail from "../components/NoteDetail";

function NoteDetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <NoteDetailPage id={id} navigate={navigate} />;
}

class NoteDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getNote(props.id),
    };

    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  onArchiveHandler(id) {
    if (this.state.notes.archived) {
      unarchiveNote(id);
      this.props.navigate("/");
    } else {
      archiveNote(id);
      this.props.navigate("/");
    }
  }

  onDeleteHandler(id) {
    deleteNote(id);
    this.props.navigate("/");
  }

  render() {
    if (this.state.notes) {
      return (
        <>
          <NoteDetail {...this.state.notes} />
          <div className="detail-page__action">
            <ArchiveUnarchiveButton
              id={this.props.id}
              onArchive={this.onArchiveHandler}
              isArchive={this.state.notes.archived}
            />
            <DeleteButton id={this.props.id} onDelete={this.onDeleteHandler} />
          </div>
        </>
      );
    }

    return <NotFoundPage />;
  }
}

NoteDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default NoteDetailPageWrapper;
