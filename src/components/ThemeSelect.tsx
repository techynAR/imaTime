import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { themes, ThemeKey } from '../themes';

interface Props {
  value: ThemeKey;
  onChange: (value: ThemeKey) => void;
}

export function ThemeSelect({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTheme = themes[value];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 ${currentTheme.bg} ${currentTheme.text} border border-opacity-20 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 min-w-[120px] justify-between`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${currentTheme.bg} border border-opacity-20 z-20`}>
          <div className="max-h-64 overflow-y-auto">
            {Object.keys(themes).map((themeName) => (
              <button
                key={themeName}
                onClick={() => {
                  onChange(themeName as ThemeKey);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-opacity-10 hover:bg-white ${
                  themeName === value ? `${currentTheme.accent} bg-opacity-5 bg-white` : ''
                }`}
              >
                {themeName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}