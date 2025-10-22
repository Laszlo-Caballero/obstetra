'use client';
import { Theme, useTheme } from '@/components/context/ThemeContext';
import { LuSun } from 'react-icons/lu';
import { LuMoon } from 'react-icons/lu';

export default function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="cursor-pointer rounded-md border border-gray-400 p-2"
      onClick={() => {
        if (theme === 'light') {
          toggleTheme(Theme.DARK);
        } else {
          toggleTheme(Theme.LIGHT);
        }
      }}
    >
      {theme === 'light' ? <LuMoon size={20} className="text-white" /> : <LuSun size={20} />}
    </button>
  );
}
