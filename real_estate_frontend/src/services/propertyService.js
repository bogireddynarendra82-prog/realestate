import API from '../api/axiosInstance';
export const searchProperties = (params) => API.get('/properties', { params });
export const getProperty = (id) => API.get(`/properties/${id}`);
export const createProperty = (formData) => API.post('/properties', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProperty = (id, formData) => API.put(`/properties/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteProperty = (id) => API.delete(`/properties/${id}`);
export const contactSeller = (id, body) => API.post(`/properties/${id}/contact`, body);