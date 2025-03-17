// src/App.js
import React, { useState } from 'react';
import AWSKeyForm from './components/AWSKeyForm';
import Dashboard from './components/Dashboard';
import ConfirmationModal from './components/ConfirmationModal';
import { authenticate, getAuditResults, fixIssue, fixAllIssues } from './api';

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [auditResults, setAuditResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFix, setSelectedFix] = useState(null);

  const handleApiKeySubmit = async (apiKey, secretKey) => {
    setApiKey(apiKey);
    setSecretKey(secretKey);
    try {
      await authenticate(apiKey, secretKey);
      const results = await getAuditResults();
      setAuditResults(results.data);
    } catch (error) {
      console.error('Authentication or audit fetching failed:', error);
    }
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
    try {
      if (selectedFix === 'all') {
        await fixAllIssues();
      } else {
        await fixIssue(selectedFix);
      }
      const results = await getAuditResults();
      setAuditResults(results.data);
    } catch (error) {
      console.error('Fix operation failed:', error);
    }
    setShowModal(false);
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
