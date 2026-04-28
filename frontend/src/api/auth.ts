import { api } from './axios';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export const login = (payload: LoginPayload) => api.post('/auth/login', payload);
export const register = (payload: RegisterPayload) => api.post('/auth/register', payload);
export const logout = () => api.post('/auth/logout');
export const fetchMe = () => api.get('/auth/me');
