import React from 'react';

const Dashboard = ({ onFixAll }) => {
  return (
    <div className="dashboard">
      <h2>Audit Report</h2>
      <button onClick={onFixAll}>Fix All</button>
      {/* Embed the report using an iframe */}
      <iframe 
        src="http://127.0.0.1:5000/report" 
        style={{ width: '100%', height: '80vh', border: 'none' }}
        title="Audit Report"
      />
    </div>
  );
};

export default Dashboard;