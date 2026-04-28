import { type ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { fetchMe } from '../api/auth';

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  useEffect(() => {
    if (token && !user) {
      setLoading(true);
      fetchMe()
        .then((response) => {
          if (response.data.success) {
            setUser(response.data.data.user);
          }
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token, user, setUser, setLoading, logout]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
