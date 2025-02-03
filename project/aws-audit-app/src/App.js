// src/App.js
import React, { useState } from 'react';
import AWSKeyForm from './components/AWSKeyForm';
import Dashboard from './components/Dashboard';
import ConfirmationModal from './components/ConfirmationModal';
import { authenticate, getAuditResults, fixIssue, fixAllIssues } from './api';

const App = () => {
  const [accesKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [auditResults, setAuditResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFix, setSelectedFix] = useState(null);

  const handleApiKeySubmit = async (accessKey, secretKey) => {
    setAccessKey(accessKey);
    setSecretKey(secretKey);
    await authenticate(accesKey, secretKey);
    const results = await getAuditResults();
    setAuditResults(results.data);
  };

  const handleFix = (id) => {
    setSelectedFix(id);
    setShowModal(true);
  };

  const handleFixAll = () => {
    setSelectedFix('all');
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (selectedFix === 'all') {
      await fixAllIssues();
    } else {
      await fixIssue(selectedFix);
    }
    setShowModal(false);
    const results = await getAuditResults();
    setAuditResults(results.data);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <AWSKeyForm onSubmit={handleApiKeySubmit} />
      <Dashboard auditResults={auditResults} onFix={handleFix} onFixAll={handleFixAll} />
      <ConfirmationModal isOpen={showModal} onConfirm={handleConfirm} onCancel={handleCancel} />
    </div>
  );
};

export default App;
