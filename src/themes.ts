export const themes = {
  'OLED Black': {
    bg: 'bg-black',
    text: 'text-white',
    accent: 'text-white',
    secondary: 'text-gray-400',
    hover: 'hover:text-gray-200'
  },
  'Pure Light': {
    bg: 'bg-white',
    text: 'text-gray-900',
    accent: 'text-gray-800',
    secondary: 'text-gray-600',
    hover: 'hover:text-gray-700'
  },
  'Ocean Blue': {
    bg: 'bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-blue-950 via-blue-900 to-blue-950',
    text: 'text-blue-100',
    accent: 'text-blue-400',
    secondary: 'text-blue-300',
    hover: 'hover:text-blue-200'
  },
  'Sunset Glow': {
    bg: 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500',
    text: 'text-white',
    accent: 'text-yellow-300',
    secondary: 'text-orange-200',
    hover: 'hover:text-yellow-200'
  },
  'Aurora Borealis': {
    bg: 'bg-gradient-to-tr from-green-400 via-teal-500 to-blue-500',
    text: 'text-white',
    accent: 'text-teal-200',
    secondary: 'text-teal-100',
    hover: 'hover:text-teal-300'
  },
  'Forest Night': {
    bg: 'bg-gradient-to-br from-green-900 via-emerald-800 to-green-950',
    text: 'text-emerald-100',
    accent: 'text-emerald-300',
    secondary: 'text-emerald-200',
    hover: 'hover:text-emerald-400'
  },
  'Desert Sand': {
    bg: 'bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200',
    text: 'text-amber-900',
    accent: 'text-amber-700',
    secondary: 'text-amber-800',
    hover: 'hover:text-amber-600'
  },
  'Deep Purple': {
    bg: 'bg-gradient-to-br from-purple-900 via-violet-800 to-purple-950',
    text: 'text-purple-100',
    accent: 'text-purple-300',
    secondary: 'text-purple-200',
    hover: 'hover:text-purple-400'
  },
  'Cyber Mint': {
    bg: 'bg-gradient-to-r from-cyan-900 via-teal-800 to-cyan-900',
    text: 'text-cyan-100',
    accent: 'text-cyan-300',
    secondary: 'text-cyan-200',
    hover: 'hover:text-cyan-400'
  },
  'Rose Gold': {
    bg: 'bg-gradient-to-br from-rose-200 via-pink-100 to-rose-200',
    text: 'text-rose-900',
    accent: 'text-rose-700',
    secondary: 'text-rose-800',
    hover: 'hover:text-rose-600'
  }
} as const;

export type ThemeKey = keyof typeof themes;