import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const ProtectedRoute: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
