module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ink: '#0E1424',
        navy: '#1A2340',
        gold: '#C9963F',
        goldLight: '#F2C46D',
        cream: '#F7F3EC',
        sand: '#EFE8DC',
        surface: '#FFFFFF',
        line: '#E6DED0',
        muted: '#7A7F8C',
        danger: '#C0392B',
        success: '#2E7D4F',
      },
      fontFamily: {
        display: ['PlayfairDisplay_700Bold'],
        'display-semi': ['PlayfairDisplay_600SemiBold'],
        'display-regular': ['PlayfairDisplay_400Regular'],
      },
    },
  },
  plugins: [],
};
