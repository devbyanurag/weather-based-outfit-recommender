// darkModeThunks.ts

import type { AppDispatch } from "../../store/store";
import { setDarkMode } from "../slices/theme/darkModeSlice";


export const initializeDarkMode = () => (dispatch: AppDispatch) => {
  const theme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || (!theme && prefersDark);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  dispatch(setDarkMode(isDark));
};

export const toggleDarkModeWithSideEffects = () => (dispatch: AppDispatch, getState: () => any) => {
  const isDark = getState().darkMode.isDarkMode;
  if (isDark) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    dispatch(setDarkMode(false));
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    dispatch(setDarkMode(true));
  }
};