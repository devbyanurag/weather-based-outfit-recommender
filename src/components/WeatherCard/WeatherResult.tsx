import React from 'react';
import WeatherIcon from './WeatherIcon';
import { FaWind, FaTint, FaEye } from 'react-icons/fa';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentWeather } from '../../features/slices/weather/weatherSlice';
import { getOutfitRecommendation } from '../../utils/getOutfitRecommendation';

const WeatherResult: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const currentWeather = useAppSelector(selectCurrentWeather);
  if (!currentWeather) return null;
  const recommendation = getOutfitRecommendation(currentWeather);

  return (
    <div className={`border-t px-6 md:px-8 py-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Main Weather Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <WeatherIcon iconCode={currentWeather.icon} size={64} className="inline-block" />
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {currentWeather.city}
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{currentWeather.condition}</p>
            </div>
          </div>
          <div className="text-center md:text-left md:pl-5">
            <span className={`text-5xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {currentWeather.temperature}°
            </span>
            <span className={`text-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>C</span>
          </div>
        </div>
        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <FaWind className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wind</span>
            </div>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{currentWeather.windSpeed} m/s</p>
          </div>
          <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <FaTint className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Humidity</span>
            </div>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{currentWeather.humidity}%</p>
          </div>
          <div className={`p-4 rounded-xl col-span-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <FaEye className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Visibility</span>
            </div>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{currentWeather.visibility} km</p>
          </div>
        </div>
      </div>
      {/* Outfit Recommendation */}
      {recommendation.text && (
        <div className={`mt-6 p-4 rounded-xl border-2 border-dashed ${isDarkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50'
          }`}>
          <div className={`flex items-center gap-3 ${recommendation.color}`}>
            {recommendation.icon}
            <span className="font-semibold text-lg">{recommendation.text}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherResult;