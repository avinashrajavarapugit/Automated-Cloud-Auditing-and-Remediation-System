// src/components/ConfirmationModal.js
import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to proceed?</p>
        <button onClick={onConfirm} className="confirm-button">Confirm</button>
        <button onClick={onCancel} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
