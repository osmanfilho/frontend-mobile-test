import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3333',
  //baseURL: 'http://192.168.0.17:3333',
  baseURL: 'http://gateway.marvel.com/v1/public',
});

export default api;
