import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { themes, ThemeKey } from '../themes';

interface TimezoneInfo {
  name: string;
  offset: string;
  value: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  theme: ThemeKey;
}

export function TimezoneSelect({ value, onChange, theme }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = themes[theme];

  const getTimezoneList = (): TimezoneInfo[] => {
    return [
      { name: 'Afghanistan', offset: 'GMT+4:30', value: 'Asia/Kabul' },
      { name: 'Albania', offset: 'GMT+1:00', value: 'Europe/Tirane' },
      { name: 'Algeria', offset: 'GMT+1:00', value: 'Africa/Algiers' },
      { name: 'Angola', offset: 'GMT+1:00', value: 'Africa/Luanda' },
      { name: 'Argentina', offset: 'GMT-3:00', value: 'America/Argentina/Buenos_Aires' },
      { name: 'Australia', offset: 'GMT+10:00', value: 'Australia/Sydney' },
      { name: 'Austria', offset: 'GMT+1:00', value: 'Europe/Vienna' },
      { name: 'Azerbaijan', offset: 'GMT+4:00', value: 'Asia/Baku' },
      { name: 'Bahrain', offset: 'GMT+3:00', value: 'Asia/Bahrain' },
      { name: 'Bangladesh', offset: 'GMT+6:00', value: 'Asia/Dhaka' },
      { name: 'Belarus', offset: 'GMT+3:00', value: 'Europe/Minsk' },
      { name: 'Belgium', offset: 'GMT+1:00', value: 'Europe/Brussels' },
      { name: 'Brazil', offset: 'GMT-3:00', value: 'America/Sao_Paulo' },
      { name: 'Bulgaria', offset: 'GMT+2:00', value: 'Europe/Sofia' },
      { name: 'Cambodia', offset: 'GMT+7:00', value: 'Asia/Phnom_Penh' },
      { name: 'Cameroon', offset: 'GMT+1:00', value: 'Africa/Douala' },
      { name: 'Canada', offset: 'GMT-5:00', value: 'America/Toronto' },
      { name: 'Chile', offset: 'GMT-4:00', value: 'America/Santiago' },
      { name: 'China', offset: 'GMT+8:00', value: 'Asia/Shanghai' },
      { name: 'Colombia', offset: 'GMT-5:00', value: 'America/Bogota' },
      { name: 'Costa Rica', offset: 'GMT-6:00', value: 'America/Costa_Rica' },
      { name: 'Croatia', offset: 'GMT+1:00', value: 'Europe/Zagreb' },
      { name: 'Cuba', offset: 'GMT-5:00', value: 'America/Havana' },
      { name: 'Cyprus', offset: 'GMT+2:00', value: 'Asia/Nicosia' },
      { name: 'Czech Republic', offset: 'GMT+1:00', value: 'Europe/Prague' },
      { name: 'Denmark', offset: 'GMT+1:00', value: 'Europe/Copenhagen' },
      { name: 'Ecuador', offset: 'GMT-5:00', value: 'America/Guayaquil' },
      { name: 'Egypt', offset: 'GMT+2:00', value: 'Africa/Cairo' },
      { name: 'Estonia', offset: 'GMT+2:00', value: 'Europe/Tallinn' },
      { name: 'Ethiopia', offset: 'GMT+3:00', value: 'Africa/Addis_Ababa' },
      { name: 'Finland', offset: 'GMT+2:00', value: 'Europe/Helsinki' },
      { name: 'France', offset: 'GMT+1:00', value: 'Europe/Paris' },
      { name: 'Germany', offset: 'GMT+1:00', value: 'Europe/Berlin' },
      { name: 'Ghana', offset: 'GMT+0:00', value: 'Africa/Accra' },
      { name: 'Greece', offset: 'GMT+2:00', value: 'Europe/Athens' },
      { name: 'Hong Kong', offset: 'GMT+8:00', value: 'Asia/Hong_Kong' },
      { name: 'Hungary', offset: 'GMT+1:00', value: 'Europe/Budapest' },
      { name: 'Iceland', offset: 'GMT+0:00', value: 'Atlantic/Reykjavik' },
      { name: 'India', offset: 'GMT+5:30', value: 'Asia/Kolkata' },
      { name: 'Indonesia', offset: 'GMT+7:00', value: 'Asia/Jakarta' },
      { name: 'Iran', offset: 'GMT+3:30', value: 'Asia/Tehran' },
      { name: 'Iraq', offset: 'GMT+3:00', value: 'Asia/Baghdad' },
      { name: 'Ireland', offset: 'GMT+0:00', value: 'Europe/Dublin' },
      { name: 'Israel', offset: 'GMT+2:00', value: 'Asia/Jerusalem' },
      { name: 'Italy', offset: 'GMT+1:00', value: 'Europe/Rome' },
      { name: 'Jamaica', offset: 'GMT-5:00', value: 'America/Jamaica' },
      { name: 'Japan', offset: 'GMT+9:00', value: 'Asia/Tokyo' },
      { name: 'Jordan', offset: 'GMT+3:00', value: 'Asia/Amman' },
      { name: 'Kazakhstan', offset: 'GMT+6:00', value: 'Asia/Almaty' },
      { name: 'Kenya', offset: 'GMT+3:00', value: 'Africa/Nairobi' },
      { name: 'Kuwait', offset: 'GMT+3:00', value: 'Asia/Kuwait' },
      { name: 'Latvia', offset: 'GMT+2:00', value: 'Europe/Riga' },
      { name: 'Lebanon', offset: 'GMT+2:00', value: 'Asia/Beirut' },
      { name: 'Libya', offset: 'GMT+2:00', value: 'Africa/Tripoli' },
      { name: 'Lithuania', offset: 'GMT+2:00', value: 'Europe/Vilnius' },
      { name: 'Luxembourg', offset: 'GMT+1:00', value: 'Europe/Luxembourg' },
      { name: 'Malaysia', offset: 'GMT+8:00', value: 'Asia/Kuala_Lumpur' },
      { name: 'Malta', offset: 'GMT+1:00', value: 'Europe/Malta' },
      { name: 'Mexico', offset: 'GMT-6:00', value: 'America/Mexico_City' },
      { name: 'Mongolia', offset: 'GMT+8:00', value: 'Asia/Ulaanbaatar' },
      { name: 'Morocco', offset: 'GMT+1:00', value: 'Africa/Casablanca' },
      { name: 'Myanmar', offset: 'GMT+6:30', value: 'Asia/Yangon' },
      { name: 'Nepal', offset: 'GMT+5:45', value: 'Asia/Kathmandu' },
      { name: 'Netherlands', offset: 'GMT+1:00', value: 'Europe/Amsterdam' },
      { name: 'New Zealand', offset: 'GMT+12:00', value: 'Pacific/Auckland' },
      { name: 'Nigeria', offset: 'GMT+1:00', value: 'Africa/Lagos' },
      { name: 'Norway', offset: 'GMT+1:00', value: 'Europe/Oslo' },
      { name: 'Pakistan', offset: 'GMT+5:00', value: 'Asia/Karachi' },
      { name: 'Panama', offset: 'GMT-5:00', value: 'America/Panama' },
      { name: 'Peru', offset: 'GMT-5:00', value: 'America/Lima' },
      { name: 'Philippines', offset: 'GMT+8:00', value: 'Asia/Manila' },
      { name: 'Poland', offset: 'GMT+1:00', value: 'Europe/Warsaw' },
      { name: 'Portugal', offset: 'GMT+0:00', value: 'Europe/Lisbon' },
      { name: 'Qatar', offset: 'GMT+3:00', value: 'Asia/Qatar' },
      { name: 'Romania', offset: 'GMT+2:00', value: 'Europe/Bucharest' },
      { name: 'Russia', offset: 'GMT+3:00', value: 'Europe/Moscow' },
      { name: 'Saudi Arabia', offset: 'GMT+3:00', value: 'Asia/Riyadh' },
      { name: 'Serbia', offset: 'GMT+1:00', value: 'Europe/Belgrade' },
      { name: 'Singapore', offset: 'GMT+8:00', value: 'Asia/Singapore' },
      { name: 'Slovakia', offset: 'GMT+1:00', value: 'Europe/Bratislava' },
      { name: 'Slovenia', offset: 'GMT+1:00', value: 'Europe/Ljubljana' },
      { name: 'South Africa', offset: 'GMT+2:00', value: 'Africa/Johannesburg' },
      { name: 'South Korea', offset: 'GMT+9:00', value: 'Asia/Seoul' },
      { name: 'Spain', offset: 'GMT+1:00', value: 'Europe/Madrid' },
      { name: 'Sri Lanka', offset: 'GMT+5:30', value: 'Asia/Colombo' },
      { name: 'Sweden', offset: 'GMT+1:00', value: 'Europe/Stockholm' },
      { name: 'Switzerland', offset: 'GMT+1:00', value: 'Europe/Zurich' },
      { name: 'Syria', offset: 'GMT+2:00', value: 'Asia/Damascus' },
      { name: 'Taiwan', offset: 'GMT+8:00', value: 'Asia/Taipei' },
      { name: 'Thailand', offset: 'GMT+7:00', value: 'Asia/Bangkok' },
      { name: 'Turkey', offset: 'GMT+3:00', value: 'Europe/Istanbul' },
      { name: 'UAE', offset: 'GMT+4:00', value: 'Asia/Dubai' },
      { name: 'UK', offset: 'GMT+0:00', value: 'Europe/London' },
      { name: 'Ukraine', offset: 'GMT+2:00', value: 'Europe/Kiev' },
      { name: 'USA (New York)', offset: 'GMT-5:00', value: 'America/New_York' },
      { name: 'USA (Los Angeles)', offset: 'GMT-8:00', value: 'America/Los_Angeles' },
      { name: 'USA (Chicago)', offset: 'GMT-6:00', value: 'America/Chicago' },
      { name: 'USA (Denver)', offset: 'GMT-7:00', value: 'America/Denver' },
      { name: 'Uruguay', offset: 'GMT-3:00', value: 'America/Montevideo' },
      { name: 'Venezuela', offset: 'GMT-4:00', value: 'America/Caracas' },
      { name: 'Vietnam', offset: 'GMT+7:00', value: 'Asia/Ho_Chi_Minh' },
      { name: 'Zimbabwe', offset: 'GMT+2:00', value: 'Africa/Harare' }
    ].sort((a, b) => a.name.localeCompare(b.name));
  };

  const timezones = getTimezoneList();
  const filteredTimezones = timezones.filter(tz => 
    tz.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedTimezone = timezones.find(tz => tz.value === value) || timezones[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 ${currentTheme.bg} ${currentTheme.text} border border-opacity-20 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 min-w-[200px] justify-between`}
      >
        <span className="truncate">{selectedTimezone.name} ({selectedTimezone.offset})</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-72 rounded-lg shadow-lg ${currentTheme.bg} border border-opacity-20 z-20`}>
          <div className="p-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className={`w-full pl-9 pr-3 py-1.5 rounded ${currentTheme.bg} ${currentTheme.text} border border-opacity-20 text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              />
            </div>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {filteredTimezones.map((tz) => (
              <button
                key={tz.value}
                onClick={() => {
                  onChange(tz.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-opacity-10 hover:bg-white ${
                  tz.value === value ? `${currentTheme.accent} bg-opacity-5 bg-white` : ''
                }`}
              >
                <span className="font-medium">{tz.name}</span>
                <span className="ml-2 opacity-70">{tz.offset}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}