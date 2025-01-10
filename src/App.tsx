import React, { useState, useEffect, useRef } from 'react';
import { Clock, Minimize2, Maximize2, Info, Eye, EyeOff, Settings, Check } from 'lucide-react';
import { themes, type ThemeKey } from './themes';
import { TimezoneSelect } from './components/TimezoneSelect';
import { ThemeSelect } from './components/ThemeSelect';

// Local storage keys
const THEME_KEY = 'imaTime_theme';
const TIMEZONE_KEY = 'imaTime_timezone';
const REMEMBER_TIMEZONE_KEY = 'imaTime_remember_timezone';

function App() {
  const [time, setTime] = useState(new Date());
  const [showSeconds, setShowSeconds] = useState(true);
  const [theme, setTheme] = useState<ThemeKey>(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return (savedTheme as ThemeKey) || 'OLED Black';
  });
  const [timezone, setTimezone] = useState(() => {
    const rememberTimezone = localStorage.getItem(REMEMBER_TIMEZONE_KEY) === 'true';
    const savedTimezone = localStorage.getItem(TIMEZONE_KEY);
    return rememberTimezone && savedTimezone ? savedTimezone : Intl.DateTimeFormat().resolvedOptions().timeZone;
  });
  const [rememberTimezone, setRememberTimezone] = useState(() => {
    return localStorage.getItem(REMEMBER_TIMEZONE_KEY) === 'true';
  });
  const [isMinimal, setIsMinimal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  
  const settingsRef = useRef<HTMLDivElement>(null);
  const settingsTimeoutRef = useRef<number>();
  
  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Save timezone and remember setting to localStorage when they change
  useEffect(() => {
    if (rememberTimezone) {
      localStorage.setItem(TIMEZONE_KEY, timezone);
    } else {
      localStorage.removeItem(TIMEZONE_KEY);
    }
    localStorage.setItem(REMEMBER_TIMEZONE_KEY, rememberTimezone.toString());
  }, [timezone, rememberTimezone]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Add this effect for click outside handling
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add this effect for auto-close timer
  useEffect(() => {
    if (showSettings) {
      // Clear any existing timeout
      if (settingsTimeoutRef.current) {
        window.clearTimeout(settingsTimeoutRef.current);
      }
      
      // Set new timeout
      settingsTimeoutRef.current = window.setTimeout(() => {
        setShowSettings(false);
      }, 10000);
    }

    return () => {
      if (settingsTimeoutRef.current) {
        window.clearTimeout(settingsTimeoutRef.current);
      }
    };
  }, [showSettings]);

  useEffect(() => {
    let timeout: number;
    const handleMovement = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    document.addEventListener('mousemove', handleMovement);
    document.addEventListener('touchstart', handleMovement);

    return () => {
      document.removeEventListener('mousemove', handleMovement);
      document.removeEventListener('touchstart', handleMovement);
      clearTimeout(timeout);
    };
  }, []);

  // Add this handler to reset the timer on user interaction
  const handleSettingsInteraction = () => {
    if (settingsTimeoutRef.current) {
      window.clearTimeout(settingsTimeoutRef.current);
    }
    settingsTimeoutRef.current = window.setTimeout(() => {
      setShowSettings(false);
    }, 10000);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

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
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} flex flex-col transition-all duration-500`}>
      {/* Settings Icon and Panel */}
      <div className={`absolute top-4 right-4 z-30 transition-opacity duration-300 ${isMinimal ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} ref={settingsRef}>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`p-2 rounded-full ${currentTheme.secondary} hover:opacity-75 transition-all duration-300`}
        >
          <Settings 
            size={24} 
            className={`transition-transform duration-500 ${showSettings ? 'rotate-180' : ''}`}
          />
        </button>

        {showSettings && (
          <div 
            className={`absolute top-full right-0 mt-2 p-4 rounded-lg ${currentTheme.bg} border border-opacity-20 shadow-lg space-y-4 min-w-[250px]`}
            onMouseMove={handleSettingsInteraction}
            onClick={handleSettingsInteraction}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <ThemeSelect value={theme} onChange={setTheme} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>
              <TimezoneSelect value={timezone} onChange={setTimezone} theme={theme} />
              <button
                onClick={() => setRememberTimezone(!rememberTimezone)}
                className={`flex items-center space-x-2 text-sm ${currentTheme.secondary} hover:opacity-75 transition-all duration-300 mt-1`}
              >
                <div className={`w-4 h-4 border rounded flex items-center justify-center ${rememberTimezone ? currentTheme.accent : 'border-current'}`}>
                  {rememberTimezone && <Check size={12} />}
                </div>
                <span>Remember timezone</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navbar */}
      <div className={`transition-opacity duration-300 ${isMinimal ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <div 
              className="flex items-center space-x-4 opacity-80 cursor-pointer group relative"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Clock className="w-8 h-8" />
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-light tracking-wider">imaTime</h1>
                <Info size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {showInfo && (
                <div className={`absolute top-full left-0 mt-4 p-4 rounded-lg ${currentTheme.bg} border border-opacity-20 shadow-lg z-10 w-72`}>
                  <h3 className="font-medium mb-2">About the name</h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                    "Ima" (今) means "now" in Japanese, reflecting the present moment. This name was chosen to honor the Japanese concept of "いまここ" (ima-koko) - the here and now - emphasizing mindful awareness of the present moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
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
      </div>

      {/* Floating Controls */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => setIsMinimal(!isMinimal)}
          className={`p-2 rounded-full ${currentTheme.secondary} hover:opacity-75 transition-all duration-300`}
          title={isMinimal ? "Show UI" : "Hide UI"}
        >
          {isMinimal ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
        <button
          onClick={toggleFullscreen}
          className={`p-2 rounded-full ${currentTheme.secondary} hover:opacity-75 transition-all duration-300`}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>
    </div>
  );
}

export default App;