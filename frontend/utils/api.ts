import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// You can also export specific API calls here
export const someApiCall = (data: any) => api.post('/some-endpoint', data);
export const anotherApiCall = () => api.get('/another-endpoint');
