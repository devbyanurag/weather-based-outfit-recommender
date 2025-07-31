import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleDarkModeWithSideEffects } from '../features/thunk/darkMode';

const ThemeToggleButton: React.FC = () => {
    const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
    const dispatch = useAppDispatch();

    return (
        <button
            onClick={() => {
                dispatch(toggleDarkModeWithSideEffects());
            }}
            className="p-3 rounded-full transition-all duration-300 bg-white text-gray-600 hover:bg-gray-50 shadow-md dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700"
        >
            {isDarkMode ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
        </button>
    );
};

export default ThemeToggleButton;