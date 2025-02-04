import React, { createContext, useContext, useState } from 'react';

interface WeatherContextType {
  unit: 'celsius' | 'fahrenheit';
  toggleUnit: () => void;
  lastCity: string;
  setLastCity: (city: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [lastCity, setLastCity] = useState(() => {
    return localStorage.getItem('lastCity') || '';
  });

  const toggleUnit = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const updateLastCity = (city: string) => {
    setLastCity(city);
    localStorage.setItem('lastCity', city);
  };

  return (
    <WeatherContext.Provider value={{
      unit,
      toggleUnit,
      lastCity,
      setLastCity: updateLastCity
    }}>
      {children}
    </WeatherContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}