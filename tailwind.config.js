

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',"./src/**/*.{tsx,ts,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#2424B7',
        'custom-white': '#fdfdfd',
        'custom-orange': '#D55002',
        'custom-red': '#A11D1D',
      },
    },
  },
  plugins: [],
}

