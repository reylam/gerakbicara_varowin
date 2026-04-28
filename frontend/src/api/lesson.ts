import { api } from './axios';

export const getLessonDetail = (lessonId: string | number) => api.get(`/lesson-simulation/lessons/${lessonId}`);
export const completeLesson = (lessonId: string | number) => api.post('/lesson-simulation/complete', { lesson_id: lessonId });
