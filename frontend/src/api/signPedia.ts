import { api } from './axios';

export const getSigns = (page = 1) => api.get('/sign-pedia/signs', { params: { page } });
export const searchSigns = (query: string, page = 1) => api.get('/sign-pedia/search', { params: { q: query, page } });
