import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/slices/weather/weatherSlice';
import darkModeReducer from '../features/slices/theme/darkModeSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    darkMode: darkModeReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;