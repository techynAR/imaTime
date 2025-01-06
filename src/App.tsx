import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

function App() {
  const [time, setTime] = useState(new Date());
  const [showSeconds, setShowSeconds] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const hours = formatNumber(time.getHours());
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());
  const date = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center transition-all duration-500">
      <div className="w-full max-w-3xl px-4 py-8 space-y-8">
        <div className="flex items-center justify-center space-x-4 mb-8 opacity-80">
          <Clock className="w-8 h-8" />
          <h1 className="text-2xl font-light tracking-wider">PRECISE TIME</h1>
        </div>

        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <div className="text-8xl font-light tracking-tight tabular-nums">
              <span className="transition-all duration-300 hover:text-blue-400">{hours}</span>
              <span className="animate-pulse">:</span>
              <span className="transition-all duration-300 hover:text-blue-400">{minutes}</span>
              {showSeconds && (
                <>
                  <span className="animate-pulse">:</span>
                  <span className="transition-all duration-300 hover:text-blue-400">{seconds}</span>
                </>
              )}
            </div>
          </div>

          <div 
            className="text-xl text-gray-400 font-light tracking-wide cursor-pointer transition-all duration-300 hover:text-white"
            onClick={() => setShowSeconds(!showSeconds)}
          >
            {date}
          </div>
        </div>

        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Click the date to toggle seconds display</p>
        </div>
      </div>
    </div>
  );
}

export default App;