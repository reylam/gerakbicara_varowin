import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  const storedTheme = localStorage.getItem('gerak_theme');
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

document.documentElement.classList.add(getInitialTheme());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
