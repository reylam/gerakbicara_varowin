/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7fc',
          100: '#d6e8f5',
          500: '#1e71b7',
          800: '#155583',
        },
        secondary: {
          100: '#d2e4e9',
          500: '#4a7c8e',
        },
        tertiary: {
          500: '#d6e8f5',
        },
        accent: {
          300: '#ffd79c',
          500: '#fab95b',
        },
        success: {
          500: '#10b981',
        },
        background: '#f6f4f0',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(59, 130, 246, 0)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0) translateX(-50%)' },
          '50%': { transform: 'translateY(-4px) translateX(-50%)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce-gentle 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};