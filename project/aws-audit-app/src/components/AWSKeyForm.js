// src/components/AWSKeyForm.js
import React, { useState } from 'react';

const AWSKeyForm = ({ onSubmit }) => {
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(accessKey, secretKey);
  };

  return (
    
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        value={accessKey}
        onChange={(e) => setAccessKey(e.target.value)}
        className="border p-2"
        placeholder="AWS Access key ID"
      />
      <input
        type="text"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        className="border p-2"
        placeholder="AWS Secret access key:"
      />
      
      <button type="submit" className="bg-blue-500 text-white p-2 ml-2">Submit</button>
    </form>
  );
};

export default AWSKeyForm;
