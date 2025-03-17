// src/api.js
import axios from 'axios';
axios.defaults.withCredentials = true;

const API_URL = 'http://127.0.0.1:5000';

export const authenticate = (apiKey, secretKey) => {
  return axios.post(`${API_URL}/authenticate`, { apiKey, secretKey });
};

export const getAuditResults = () => {
  return axios.get(`${API_URL}/report`);
};

export const fixIssue = (id) => {
  return axios.post(`${API_URL}/fix`, { id });
};

export const fixAllIssues = () => {
  return axios.post(`${API_URL}/fix-all`);
};
