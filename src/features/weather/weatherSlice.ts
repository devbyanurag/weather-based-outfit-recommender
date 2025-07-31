import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// 1. Define the weather data type for your app
export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
}

// 2. Define the slice state
interface WeatherState {
  currentWeather: WeatherData | null;
  searchHistory: string[]; // last 5 cities
}

// 3. Initial state
const initialState: WeatherState = {
  currentWeather: null,
  searchHistory: [],
};

// 4. Slice
export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentWeather: (state, action: PayloadAction<WeatherData>) => {
      state.currentWeather = action.payload;
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = [
        action.payload,
        ...state.searchHistory.filter(city => city.toLowerCase() !== action.payload.toLowerCase())
      ].slice(0, 5);
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
  },
});

// 5. Actions
export const { setCurrentWeather, addToSearchHistory, clearSearchHistory } = weatherSlice.actions;

// 6. Selectors
export const selectCurrentWeather = (state: RootState) => state.weather.currentWeather;
export const selectSearchHistory = (state: RootState) => state.weather.searchHistory;

// 7. Reducer
export default weatherSlice.reducer;