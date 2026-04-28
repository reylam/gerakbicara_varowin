import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.tsx';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  const storedTheme = localStorage.getItem('gerak_theme');
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }
  return 'light';
};

document.documentElement.classList.add(getInitialTheme());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: { background: '#1e293b', color: '#f8fafc' },
      }}
    />
  </StrictMode>,
);
