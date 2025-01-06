export const themes = {
  OLED: {
    bg: 'bg-black',
    text: 'text-white',
    accent: 'text-white',
    secondary: 'text-gray-400',
    hover: 'hover:text-gray-200'
  },
  light: {
    bg: 'bg-white',
    text: 'text-gray-900',
    accent: 'text-gray-800',
    secondary: 'text-gray-600',
    hover: 'hover:text-gray-700'
  },
  blue: {
    bg: 'bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-blue-950 via-blue-900 to-blue-950',
    text: 'text-blue-100',
    accent: 'text-blue-400',
    secondary: 'text-blue-300',
    hover: 'hover:text-blue-200'
  },
  sunset: {
    bg: 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500',
    text: 'text-white',
    accent: 'text-yellow-300',
    secondary: 'text-orange-200',
    hover: 'hover:text-yellow-200'
  },
  aurora: {
    bg: 'bg-gradient-to-tr from-green-400 via-teal-500 to-blue-500',
    text: 'text-white',
    accent: 'text-teal-200',
    secondary: 'text-teal-100',
    hover: 'hover:text-teal-300'
  }
} as const;

export type ThemeKey = keyof typeof themes;