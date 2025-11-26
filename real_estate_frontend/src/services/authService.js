import API from '../api/axiosInstance';
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);