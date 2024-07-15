import axios from 'axios';

const api = axios.create({
  baseURL: 'https://habit-manager-api-zepu.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    'auth-token': localStorage.getItem('token')
  }
});

export default api;
