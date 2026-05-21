import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import FocusTimerSettings from './FocusTimerSettings';

type TimerPhase = 'work' | 'break' | 'longBreak';

interface TimerSettings {
  workMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
  enableSounds: boolean;
  enableNotifications: boolean;
}

const FocusTimer: React.FC = () => {
  // Default settings
  const [settings, setSettings] = useState<TimerSettings>({
    workMinutes: 25,
    breakMinutes: 5,
    longBreakMinutes: 15,
    sessionsBeforeLongBreak: 4,
    enableSounds: true,
    enableNotifications: true,
  });

  const [showSettings, setShowSettings] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.workMinutes * 60);
  const [phase, setPhase] = useState<TimerPhase>('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showControls, setShowControls] = useState(true);
  
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    
    // Clean up on unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle timer logic
  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handlePhaseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    const hideTimeout = setTimeout(() => {
      if (!showSettings) {
        setShowControls(false);
      }
    }, 3000);

    return () => clearTimeout(hideTimeout);
  }, [showControls, showSettings]);

  // Handle mouse movement to show controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Set timer based on current phase
  useEffect(() => {
    let minutes = 0;
    switch (phase) {
      case 'work':
        minutes = settings.workMinutes;
        break;
      case 'break':
        minutes = settings.breakMinutes;
        break;
      case 'longBreak':
        minutes = settings.longBreakMinutes;
        break;
    }
    setTimeLeft(minutes * 60);
  }, [phase, settings]);

  const handlePhaseComplete = () => {
    if (settings.enableSounds && audioRef.current) {
      audioRef.current.play();
    }

    if (settings.enableNotifications) {
      new Notification('imaTime Focus', { 
        body: `${phase.charAt(0).toUpperCase() + phase.slice(1)} phase complete!` 
      });
    }

    if (phase === 'work') {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
      
      if (newCompletedSessions % settings.sessionsBeforeLongBreak === 0) {
        setPhase('longBreak');
      } else {
        setPhase('break');
      }
    } else {
      setPhase('work');
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setPhase('work');
    setCompletedSessions(0);
    setTimeLeft(settings.workMinutes * 60);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const saveSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
    
    // Reset timer with new settings if not active
    if (!isActive) {
      setTimeLeft(newSettings.workMinutes * 60);
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage for the circle
  const calculateProgress = (): number => {
    let totalSeconds = 0;
    switch (phase) {
      case 'work':
        totalSeconds = settings.workMinutes * 60;
        break;
      case 'break':
        totalSeconds = settings.breakMinutes * 60;
        break;
      case 'longBreak':
        totalSeconds = settings.longBreakMinutes * 60;
        break;
    }
    return (1 - timeLeft / totalSeconds) * 100;
  };

  // Get phase-specific colors
  const getPhaseColor = (): string => {
    switch (phase) {
      case 'work':
        return 'text-red-500';
      case 'break':
        return 'text-green-500';
      case 'longBreak':
        return 'text-blue-500';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Timer Circle */}
      <div className="relative w-64 h-64 mb-8">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * calculateProgress()) / 100}
            className={getPhaseColor()}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-5xl font-mono tabular-nums ${getPhaseColor()}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-lg mt-2 capitalize">
            {phase === 'work' ? 'Focus' : phase === 'break' ? 'Break' : 'Long Break'}
          </div>
          <div className="text-sm mt-1">
            Session {completedSessions % settings.sessionsBeforeLongBreak || settings.sessionsBeforeLongBreak}/{settings.sessionsBeforeLongBreak}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex space-x-4">
          <button
            onClick={toggleTimer}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isActive ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <RotateCcw size={24} />
          </button>
          <button
            onClick={toggleSettings}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings size={24} />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <FocusTimerSettings
          settings={settings}
          onSave={saveSettings}
          onCancel={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default FocusTimer;