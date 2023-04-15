/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      green: {
        100: '#9ce092',
        500: '#4eaa60',
        900: '#003e2d',
      },
      black: '#001b2d',
      white: {
        100: '#ffffff',
        500: '#f2f2f2',
      },
      red: '#C92626',
    },
    fontFamily: {
      sans: 'Montserrat, sans-serif',
    },
    boxShadow: {
      DEFAULT: '0px 0px 5px rgba(0, 27, 45, 0.25)',
    },
    extend: {
      backgroundImage: {
        'gradient-200': 'linear-gradient(200deg, var(--tw-gradient-stops))',
      },
      spacing: {
        '3px': '3px',
        '270px': '270px',
        '342px': '342px',
        '480px': '480px',
      },
      zIndex: {
        9999: '9999',
      },
    },
  },
  plugins: [],
};
