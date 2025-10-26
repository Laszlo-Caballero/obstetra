'use client';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const themeKey = 'app-theme';
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useEffect(() => {
    const savedTheme = localStorage.getItem(themeKey) as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === Theme.DARK);

      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = prefersDark ? Theme.DARK : Theme.LIGHT;

    if (initialTheme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setTheme(initialTheme);
    localStorage.setItem(themeKey, initialTheme);
    Cookies.set(themeKey, initialTheme);
  }, []);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);

    document.documentElement.classList.toggle('dark', newTheme === Theme.DARK);

    localStorage.setItem(themeKey, newTheme);
    Cookies.set(themeKey, newTheme);
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
