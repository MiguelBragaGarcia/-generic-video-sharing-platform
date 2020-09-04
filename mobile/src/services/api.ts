import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://10.0.2.2:3333',
});

export default api;
