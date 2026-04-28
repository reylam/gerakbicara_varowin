import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLocalStorage } from 'react-use';

const THEME_KEY = 'gerak_theme';

type ThemeMode = 'light' | 'dark';

const applyTheme = (value: ThemeMode) => {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(value);
  localStorage.setItem(THEME_KEY, value);
};

export const ThemeToggle: React.FC = () => {
  const [storedTheme, setStoredTheme] = useLocalStorage<ThemeMode>(THEME_KEY, 'light');
  const [theme, setTheme] = useState<ThemeMode>(storedTheme ?? 'light');

  useEffect(() => {
    applyTheme(theme);
    setStoredTheme(theme);
  }, [theme, setStoredTheme]);

  const handleToggle = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text)] transition hover:brightness-95"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
    </button>
  );
};
