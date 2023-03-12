/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      yellow: '#ffcf81',
      salmon: '#e48580',
      brown: {
        100: '#5b4850',
        900: '#3f3237',
      },
    },
    fontFamily: {
      sans: ["'Lato', sans-serif"],
    },
    boxShadow: {
      DEFAULT: '0px 0px 8px rgba(13, 13, 13, 0.15)',
    },
  },
  plugins: [],
};
