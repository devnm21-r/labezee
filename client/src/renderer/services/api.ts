import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8008',
});

export const signup = (data: { email: string, name: string, role: string, password: string }) => instance.post('/v1/signup', data);
