const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.jsx', './src/components/**/*.jsx', './index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        lilac: '#dcd5e1',
        rain: '#d4e3ec',
        peach: '#fee1d2',
        khaki: '#f9efe5',
        lily: '#d8f0d8',
        mint: '#f0f0c0',
        latte: '#c0a890',
        ...defaultTheme.colors,
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  },
};
