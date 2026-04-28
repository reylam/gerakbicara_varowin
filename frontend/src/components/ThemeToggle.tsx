import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const THEME_KEY = 'gerak_theme';

type ThemeMode = 'light' | 'dark';

const applyTheme = (value: ThemeMode) => {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(value);
  localStorage.setItem(THEME_KEY, value);
};

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    const nextTheme = stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const handleToggle = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-900"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  );
};
