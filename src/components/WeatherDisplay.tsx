import { Droplets, Wind, Thermometer } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { useWeather } from '../context/WeatherContext';

interface WeatherDisplayProps {
  data: WeatherData;
}

export function WeatherDisplay({ data }: WeatherDisplayProps) {
  const { unit, toggleUnit } = useWeather();

  const convertTemp = (kelvin: number) => {
    const celsius = kelvin - 273.15;
    return unit === 'celsius'
      ? celsius.toFixed(1)
      : (celsius * 9 / 5 + 32).toFixed(1);
  };

  return (
    <div className="w-full h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">{data.name}</h2>
        <button
          onClick={toggleUnit}
          className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          Switch to °{unit === 'celsius' ? 'F' : 'C'}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
        <div className="relative">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            alt={data.weather[0].description}
            className="w-32 h-32"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 rounded-full"></div>
        </div>
        <div className="text-center sm:text-left">
          <div className="text-6xl font-bold text-gray-800 mb-2">
            {convertTemp(data.main.temp)}°
          </div>
          <div className="text-xl text-gray-600 capitalize">
            {data.weather[0].description}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
          <Thermometer className="h-6 w-6 text-orange-500 mb-2" />
          <span className="text-sm font-medium text-gray-600 mb-1">Feels like</span>
          <span className="text-lg font-semibold">{convertTemp(data.main.feels_like)}°</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
          <Droplets className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-sm font-medium text-gray-600 mb-1">Humidity</span>
          <span className="text-lg font-semibold">{data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
          <Wind className="h-6 w-6 text-green-500 mb-2" />
          <span className="text-sm font-medium text-gray-600 mb-1">Wind</span>
          <span className="text-lg font-semibold">{data.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}