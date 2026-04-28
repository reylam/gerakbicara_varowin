import { api } from './axios';

export const getPaths = () => api.get('/sign-path/paths');
export const getModulesByPath = (pathId: string | number) => api.get(`/sign-path/paths/${pathId}/modules`);
export const getLessonsByModule = (moduleId: string | number) => api.get(`/sign-path/modules/${moduleId}/lessons`);
