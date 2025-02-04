import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Cloud } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { ForecastDisplay } from './components/ForecastDisplay';
import { ErrorMessage } from './components/ErrorMessage';
import { WeatherProvider, useWeather } from './context/WeatherContext';
import type { WeatherData, ForecastData } from './types/weather';

const API_KEY = import.meta.env.VITE_APP_OPENWEATHER_API_KEY;
const REFRESH_INTERVAL = 30000;

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return res.json();
};

function WeatherDashboard() {
  const { lastCity, setLastCity } = useWeather();
  const [city, setCity] = useState(lastCity);
  const [error, setError] = useState<string | null>(null);

  const { data: currentWeather, error: currentError } = useSWR<WeatherData>(
    city ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}` : null,
    fetcher,
    { refreshInterval: REFRESH_INTERVAL }
  );

  const { data: forecast, error: forecastError } = useSWR<ForecastData>(
    city ? `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}` : null,
    fetcher,
    { refreshInterval: REFRESH_INTERVAL }
  );

  useEffect(() => {
    if (currentError || forecastError) {
      setError('Failed to fetch weather data. Please try again.');
    } else {
      setError(null);
    }
  }, [currentError, forecastError]);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    setLastCity(searchCity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4 flex items-start justify-center">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex gap-3 items-center justify-center mb-6">
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-full">
              <Cloud className="h-10 w-10 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Weather Dashboard</h1>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && <ErrorMessage message={error} />}

        {!currentWeather && !error && (
          <div className="text-center text-gray-600 mt-8 bg-white/50 backdrop-blur-sm p-6 rounded-lg">
            <Cloud className="h-16 w-16 text-blue-400 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Search for a city to see the weather forecast</p>
          </div>
        )}

        {currentWeather && forecast && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 place-items-center ">
            <WeatherDisplay data={currentWeather} />
            <ForecastDisplay data={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <WeatherProvider>
      <WeatherDashboard />
    </WeatherProvider>
  );
}

export default App;