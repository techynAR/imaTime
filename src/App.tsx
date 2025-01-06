import React, { useState, useEffect } from 'react';
import { Clock, Palette, Globe } from 'lucide-react';
import { themes, type ThemeKey } from './themes';

function App() {
  const [time, setTime] = useState(new Date());
  const [showSeconds, setShowSeconds] = useState(true);
  const [theme, setTheme] = useState<ThemeKey>('oled');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const timeInZone = new Date(time.toLocaleString('en-US', { timeZone: timezone }));
  const hours = formatNumber(timeInZone.getHours());
  const minutes = formatNumber(timeInZone.getMinutes());
  const seconds = formatNumber(timeInZone.getSeconds());
  const date = timeInZone.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: timezone
  });

  const currentTheme = themes[theme];

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} flex flex-col items-center justify-center transition-all duration-500`}>
      <div className="w-full max-w-3xl px-4 py-8 space-y-8">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-4 opacity-80">
            <Clock className="w-8 h-8" />
            <h1 className="text-2xl font-light tracking-wider">PRECISE TIME</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={`${currentTheme.bg} ${currentTheme.text} border border-opacity-20 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            >
              {Intl.supportedValuesOf('timeZone').map((tz) => (
                <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
              ))}
            </select>
            
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as ThemeKey)}
              className={`${currentTheme.bg} ${currentTheme.text} border border-opacity-20 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            >
              {Object.keys(themes).map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <div className="text-8xl font-light tracking-tight tabular-nums">
              <span className={`transition-all duration-300 ${currentTheme.hover}`}>{hours}</span>
              <span className="animate-pulse">:</span>
              <span className={`transition-all duration-300 ${currentTheme.hover}`}>{minutes}</span>
              {showSeconds && (
                <>
                  <span className="animate-pulse">:</span>
                  <span className={`transition-all duration-300 ${currentTheme.hover}`}>{seconds}</span>
                </>
              )}
            </div>
          </div>

          <div 
            className={`text-xl ${currentTheme.secondary} font-light tracking-wide cursor-pointer transition-all duration-300 ${currentTheme.hover}`}
            onClick={() => setShowSeconds(!showSeconds)}
          >
            {date}
          </div>
        </div>

        <div className={`text-center mt-12 ${currentTheme.secondary} text-sm`}>
          <p>Click the date to toggle seconds display</p>
        </div>
      </div>
    </div>
  );
}

export default App;