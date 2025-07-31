import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { fetchCitySuggestions, type CitySuggestion } from '../../utils/fetchCitySuggestions';

interface WeatherSearchInputProps {
  onSelect: (city: CitySuggestion) => void;
  isLoading: boolean;
  isDarkMode: boolean;
}

const WeatherSearchInput: React.FC<WeatherSearchInputProps> = ({ onSelect, isLoading, isDarkMode }) => {
  const [cityInput, setCityInput] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searching, setSearching] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce input for suggestions
  useEffect(() => {
    if (!cityInput.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    setSearching(true);
    const handler = setTimeout(async () => {
      try {
        const res = await fetchCitySuggestions(cityInput.trim());
        setSuggestions(res);
        setShowDropdown(res.length > 0);
      } catch {
        setSuggestions([]);
        setShowDropdown(false);
      } finally {
        setSearching(false);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [cityInput]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHighlighted((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      setHighlighted((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && highlighted >= 0) {
      handleSelect(suggestions[highlighted]);
    }
  };

  const handleSelect = (city: CitySuggestion) => {
    onSelect(city); // Send full city object to parent
    setCityInput('');
    setSuggestions([]);
    setShowDropdown(false);
    setHighlighted(-1);
  };

  const handleClear = () => {
    setCityInput('');
    setSuggestions([]);
    setShowDropdown(false);
    setHighlighted(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={e => {
          e.preventDefault();
          if (highlighted >= 0 && suggestions[highlighted]) {
            handleSelect(suggestions[highlighted]);
          }
        }}
        className="flex gap-3"
        autoComplete="off"
      >
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={cityInput}
            onChange={e => setCityInput(e.target.value)}
            onFocus={() => cityInput && suggestions.length > 0 && setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            placeholder="Enter city name..."
            disabled={isLoading}
            className={`w-full px-4 py-3 pl-12 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
                : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          <FaSearch className={`absolute left-4 top-3.5 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          {cityInput && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              <FaTimes />
            </button>
          )}
        </div>
      </form>
      {showDropdown && suggestions.length > 0 && (
        <div className={`absolute z-10 mt-2 w-full rounded-xl shadow-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          {suggestions.map((city, idx) => (
            <div
              key={city.name + city.lat + city.lon}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                highlighted === idx
                  ? isDarkMode
                    ? 'bg-blue-900 text-white'
                    : 'bg-blue-100 text-blue-900'
                  : isDarkMode
                  ? 'hover:bg-gray-700 text-white'
                  : 'hover:bg-gray-100 text-gray-800'
              }`}
              onMouseDown={() => handleSelect(city)}
              onMouseEnter={() => setHighlighted(idx)}
              tabIndex={0}
              aria-selected={highlighted === idx}
            >
              {city.name}
              {city.state ? `, ${city.state}` : ''}, {city.country}
            </div>
          ))}
        </div>
      )}
      {(searching || isLoading) && (
        <div className="absolute right-4 top-3.5">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default WeatherSearchInput;