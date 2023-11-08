const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: {
    relative: true,
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "../packages/**/*.{js,ts,jsx,tsx}"
    ],
  },
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
