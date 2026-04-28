import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useAuthStore((state) => state.token) ?? localStorage.getItem('token') ?? localStorage.getItem('gerak_token');

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
