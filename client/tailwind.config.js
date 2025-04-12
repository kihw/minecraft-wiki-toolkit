/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        'minecraft': {
          'dirt': '#866043',
          'grass': '#5D9C3C',
          'stone': '#828282',
          'wood': '#9C6E3C',
          'leaves': '#4B8F23',
          'water': '#3D6FD9',
          'redstone': '#C41818'
        }
      },
      fontFamily: {
        'minecraft': ['MinecraftRegular', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      boxShadow: {
        'minecraft': '0 2px 0 0 rgba(0, 0, 0, 0.2), inset 0 0 0 2px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}