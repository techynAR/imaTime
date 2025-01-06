export const themes = {
  oled: {
    bg: 'bg-black',
    text: 'text-white',
    accent: 'text-white',
    secondary: 'text-gray-400',
    hover: 'hover:text-gray-200'
  },
  blue: {
    bg: 'bg-blue-950',
    text: 'text-blue-100',
    accent: 'text-blue-400',
    secondary: 'text-blue-300',
    hover: 'hover:text-blue-200'
  },
  matrix: {
    bg: 'bg-black',
    text: 'text-green-500',
    accent: 'text-green-400',
    secondary: 'text-green-700',
    hover: 'hover:text-green-300'
  }
} as const;

export type ThemeKey = keyof typeof themes;