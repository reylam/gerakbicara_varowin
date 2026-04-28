import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { MainLayout } from './layouts/MainLayout';
import { PublicLayout } from './layouts/PublicLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { SignPath } from './pages/SignPath';
import { LessonSimulation } from './pages/LessonSimulation';
import { SignPedia } from './pages/SignPedia';
import { Challenge } from './pages/Challenge';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';
import { useAuthStore } from './store/authStore';
import { fetchMe } from './api/auth';

function App() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('gerak_token');

    if (!user && token) {
      fetchMe()
        .then((response) => {
          if (response.data.success) {
            setUser(response.data.data.user);
          } else {
            logout();
            window.location.href = '/';
          }
        })
        .catch(() => {
          logout();
          window.location.href = '/';
        });
    }
  }, [user, setUser, logout]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="signpath" element={<SignPath />} />
            <Route path="lesson/:lessonId" element={<LessonSimulation />} />
            <Route path="signpedia" element={<SignPedia />} />
            <Route path="challenge" element={<Challenge />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
