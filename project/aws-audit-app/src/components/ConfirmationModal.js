// src/components/ConfirmationModal.js
import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <p>Are you sure you want to proceed?</p>
        <button onClick={onConfirm} className="bg-green-500 text-white p-2 mr-2">Confirm</button>
        <button onClick={onCancel} className="bg-red-500 text-white p-2">Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
