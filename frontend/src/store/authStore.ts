import { create } from 'zustand';

export type UserProfile = {
  id: number | string;
  name: string;
  email: string;
  xp?: number;
  level?: number;
  streak?: number;
  avatar?: string;
  [key: string]: unknown;
};

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  loading: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

const initialToken = typeof window !== 'undefined' ? localStorage.getItem('gerak_token') : null;
const initialUser = typeof window !== 'undefined' ? localStorage.getItem('gerak_user') : null;

export const useAuthStore = create<AuthState>((set) => ({
  token: initialToken,
  user: initialUser ? JSON.parse(initialUser) : null,
  loading: false,
  setToken: (token) => {
    if (token) {
      localStorage.setItem('gerak_token', token);
    } else {
      localStorage.removeItem('gerak_token');
    }
    set({ token });
  },
  setUser: (user) => {
    if (user) {
      localStorage.setItem('gerak_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gerak_user');
    }
    set({ user });
  },
  setLoading: (loading) => set({ loading }),
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gerak_token');
      localStorage.removeItem('gerak_user');
    }
    set({ token: null, user: null });
  },
}));
