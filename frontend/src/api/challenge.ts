import { api } from './axios';

export const getChallenges = () => api.get('/challenges');
export const getQuizzesByLesson = (lessonId: string | number) => api.get(`/challenge/lesson/${lessonId}/quizzes`);
export const submitQuizAnswer = (quizId: string | number, selectedAnswerId: string | number) =>
  api.post('/challenge/submit', {
    quiz_id: quizId,
    selected_answer_id: selectedAnswerId,
  });
