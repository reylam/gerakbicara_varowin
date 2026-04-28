import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
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
