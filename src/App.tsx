
import { useEffect } from 'react';
import Header from './components/Header'
import WeatherCard from './components/WeatherCard/WeatherCard'
import { initializeDarkMode } from './features/thunk/darkModeThunks';
import { useAppDispatch } from './store/hooks';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeDarkMode());
  }, [dispatch]);

   

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <WeatherCard />
    </div>
  )
}

export default App