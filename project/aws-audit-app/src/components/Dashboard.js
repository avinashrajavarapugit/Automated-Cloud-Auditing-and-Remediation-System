// src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ auditResults, onFix, onFixAll }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Audit Results</h2>
      <button onClick={onFixAll} className="bg-green-500 text-white p-2 mb-4">Fix All</button>
      {auditResults.map((result, index) => (
        <div key={index} className="border p-2 mb-2">
          <p>Severity: {result.severity}</p>
          <p>Description: {result.description}</p>
          <button onClick={() => onFix(result.id)} className="bg-blue-500 text-white p-2">Fix</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
