import React from 'react';
import ThemeToggleButton from './ThemeToggleButton';

const Header: React.FC = () => (
  <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      Weather-Based Outfit Recommender
    </h1>
    <ThemeToggleButton />
    
  </header>
);

export default Header;