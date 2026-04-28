export const ROUTES = {
  landing: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  signPath: '/signpath',
  lesson: (lessonId: string | number) => `/lesson/${lessonId}`,
  signPedia: '/signpedia',
  challenge: '/challenge',
  leaderboard: '/leaderboard',
  profile: '/profile',
};
