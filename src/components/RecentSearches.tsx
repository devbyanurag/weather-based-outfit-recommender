import React from 'react';

const RecentSearches: React.FC<{ searches: string[]; isDarkMode: boolean }> = ({ searches, isDarkMode }) => {
  if (!searches.length) return null;
  return (
    <div className={`border-t px-6 md:px-8 py-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Searches</h3>
      <div className="flex flex-wrap gap-2">
        {searches.slice(-5).map((city, idx) => (
          <span
            key={city + idx}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {city}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;