import { api } from './axios';

export const getProfile = () => api.get('/profile');
export const updateProfile = (payload: { name?: string; email?: string }) => api.put('/profile', payload);
