import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vuttr-backend-challange.herokuapp.com',
});

export default api;
