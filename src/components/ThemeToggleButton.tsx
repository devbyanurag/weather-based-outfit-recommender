import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useDarkMode } from '../hooks/useDarkMode';

const ThemeToggleButton: React.FC = () => {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition"
      aria-label="Toggle theme"
    >
      {isDark ? <FaSun size={22} /> : <FaMoon size={22} />}
    </button>
  );
};

export default ThemeToggleButton;