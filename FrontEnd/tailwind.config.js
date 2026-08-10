module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          light:   '#9F67FF',
          dark:    '#5B21B6',
        },
        bg: {
          DEFAULT: '#0A0A0F',
          card:    '#12121A',
          surface: '#1A1A27',
          input:   '#1E1E2E',
        },
        text: {
          primary:   '#FFFFFF',
          secondary: '#A0A0B0',
          muted:     '#60607A',
          accent:    '#9F67FF',
        },
        border: {
          DEFAULT: '#2A2A3D',
          light:   '#3A3A55',
        },
        like:    '#FF3B5C',
        online:  '#22C55E',
      },
    },
  },
  plugins: [],
};