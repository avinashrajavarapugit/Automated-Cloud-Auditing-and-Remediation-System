// src/components/AWSKeyForm.js
import React, { useState } from 'react';

const AWSKeyForm = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(apiKey, secretKey);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter AWS API Key"
      />
      <input
        type="text"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        placeholder="Enter AWS Secret Key"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AWSKeyForm;
