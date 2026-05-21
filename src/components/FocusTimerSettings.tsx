import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TimerSettings {
  workMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
  enableSounds: boolean;
  enableNotifications: boolean;
}

interface FocusTimerSettingsProps {
  settings: TimerSettings;
  onSave: (settings: TimerSettings) => void;
  onCancel: () => void;
}

const FocusTimerSettings: React.FC<FocusTimerSettingsProps> = ({
  settings,
  onSave,
  onCancel,
}) => {
  const [localSettings, setLocalSettings] = useState<TimerSettings>({ ...settings });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setLocalSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseInt(value, 10),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localSettings);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Timer Settings</h2>
          <button onClick={onCancel} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Work Duration (minutes)
              </label>
              <input
                type="number"
                name="workMinutes"
                value={localSettings.workMinutes}
                onChange={handleChange}
                min="1"
                max="60"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Break Duration (minutes)
              </label>
              <input
                type="number"
                name="breakMinutes"
                value={localSettings.breakMinutes}
                onChange={handleChange}
                min="1"
                max="30"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Long Break Duration (minutes)
              </label>
              <input
                type="number"
                name="longBreakMinutes"
                value={localSettings.longBreakMinutes}
                onChange={handleChange}
                min="1"
                max="60"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Sessions Before Long Break
              </label>
              <input
                type="number"
                name="sessionsBeforeLongBreak"
                value={localSettings.sessionsBeforeLongBreak}
                onChange={handleChange}
                min="1"
                max="10"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableSounds"
                name="enableSounds"
                checked={localSettings.enableSounds}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="enableSounds" className="ml-2 text-sm">
                Enable Sound Notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableNotifications"
                name="enableNotifications"
                checked={localSettings.enableNotifications}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="enableNotifications" className="ml-2 text-sm">
                Enable Desktop Notifications
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FocusTimerSettings;