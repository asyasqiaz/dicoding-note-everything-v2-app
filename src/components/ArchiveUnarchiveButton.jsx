import React from "react";
import PropTypes from "prop-types";
import { MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";

function ArchiveUnarchiveButton({ id, onArchive, isArchive }) {
  return (
    <button className="action" onClick={() => onArchive(id)}>
      {isArchive ? (
        <MdOutlineUnarchive size={42} />
      ) : (
        <MdOutlineArchive size={42} />
      )}
    </button>
  );
}

ArchiveUnarchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  isArchive: PropTypes.bool.isRequired,
};

export default ArchiveUnarchiveButton;
