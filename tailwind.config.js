/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Same values as src/theme/tokens.ts so className and style objects agree.
      colors: {
        ink: '#14213D',
        gold: '#B8893B',
        cream: '#FAF8F5',
        surface: '#FFFFFF',
        line: '#E7E2DA',
        muted: '#6B7280',
        danger: '#B42318',
        success: '#1E7A46',
      },
    },
  },
  plugins: [],
};
