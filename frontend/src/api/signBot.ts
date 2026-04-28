import { api } from './axios';

export const fetchSignBotHistory = () => api.get('/sign-bot/history');
export const sendSignBotMessage = (message: string) => api.post('/sign-bot/message', { message });
