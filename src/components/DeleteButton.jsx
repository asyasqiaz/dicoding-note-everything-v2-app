import React from "react";
import PropTypes from "prop-types";
import { MdOutlineDelete } from "react-icons/md";

function DeleteButton({ id, onDelete }) {
  return (
    <button className="action" onClick={() => onDelete(id)}>
      <MdOutlineDelete size={42} />
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
