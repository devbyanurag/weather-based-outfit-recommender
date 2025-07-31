import React, { useState } from 'react';
import {
  setCurrentWeather,
  addToSearchHistory,
  selectSearchHistory,
} from '../../features/slices/weather/weatherSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import WeatherSearchInput from './WeatherSearchInput';
import WeatherResult from './WeatherResult';
import RecentSearches from '../RecentSearches';
import { fetchWeatherForCity } from '../../utils/fetchWeatherForCity'; // <-- import your real fetch
import type { CitySuggestion } from '../../utils/fetchCitySuggestions';

const WeatherCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector(selectSearchHistory);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const handleCitySelect = async (city: CitySuggestion) => {
    if (!city || isLoading) return;
    setIsLoading(true);
    try {
      const weather = await fetchWeatherForCity(city.name, city.lat, city.lon);
      dispatch(setCurrentWeather(weather));
      dispatch(addToSearchHistory(weather.city));
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className={`max-w-2xl mx-auto rounded-2xl shadow-2xl transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="p-6 md:p-8">
            <WeatherSearchInput onSelect={handleCitySelect} isLoading={isLoading} isDarkMode={isDarkMode} />
          </div>
          {/* Show loading spinner or the result */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <WeatherResult isDarkMode={isDarkMode} />
          )}
          <RecentSearches searches={searchHistory} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;