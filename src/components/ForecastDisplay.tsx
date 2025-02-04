import { useWeather } from '../context/WeatherContext';
import type { ForecastData } from '../types/weather';

interface ForecastDisplayProps {
    data: ForecastData;
}

export function ForecastDisplay({ data }: ForecastDisplayProps) {
    const { unit } = useWeather();

    const convertTemp = (kelvin: number) => {
        const celsius = kelvin - 273.15;
        return unit === 'celsius'
            ? celsius.toFixed(1)
            : (celsius * 9 / 5 + 32).toFixed(1);
    };

    const dailyForecasts = data.list.filter(item =>
        item.dt_txt.includes('12:00:00')
    ).slice(0, 5);

    const getDayName = (dateStr: string) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    };

    return (
        <div className="w-full flex-col bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-5 gap-3">
                {dailyForecasts.map((forecast) => (
                    <div
                        key={forecast.dt}
                        className="flex flex-col items-center p-2 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200"
                    >
                        <span className="text-sm font-medium text-gray-600 mb-1">
                            {getDayName(forecast.dt_txt)}
                        </span>
                        <img
                            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                            alt={forecast.weather[0].description}
                            className="w-10 h-10"
                        />
                        <span className="text-base font-semibold">
                            {convertTemp(forecast.main.temp)}°
                        </span>
                        <span className="text-xs text-gray-500 text-center capitalize">
                            {forecast.weather[0].description}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}