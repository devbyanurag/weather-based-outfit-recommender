import React from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import { useAppSelector } from '../store/hooks';

const Header: React.FC = () => {
    const isDarkModes = useAppSelector((state) => state.darkMode.isDarkMode);

    return (
        <header className={`flex items-center justify-between px-6 py-6 shadow w-full bg-gradient-to-br ${isDarkModes ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
            <div className="flex justify-between items-center w-full">
                <h1 className={`text-3xl md:text-4xl font-bold dark:text-white text-gray-800`}>
                    Weather App
                </h1>
                <ThemeToggleButton />

            </div>


        </header>
    );
}

export default Header;