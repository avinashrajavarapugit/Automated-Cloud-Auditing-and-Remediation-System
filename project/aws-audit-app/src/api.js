// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const authenticate = (accesKey, secretKey) => {
  return axios.post(`${API_URL}/authenticate`, { accesKey, secretKey });
};

export const getAuditResults = () => {
  return axios.get(`${API_URL}/audit`);
};

export const fixIssue = (id) => {
  return axios.post(`${API_URL}/fix`, { id });
};

export const fixAllIssues = () => {
  return axios.post(`${API_URL}/fix-all`);
};
