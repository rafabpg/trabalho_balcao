/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light': '#FFFFFF',
        'primary-default':'#004F9F',
        'secondary':'#135185',
        'primary-darker':'#003465',
        'lighter-primary':'#BCBEC0',
        'lighter-secondary':'#BDB157',
        'red-color':'#A80303',
      }
    },
  },
  plugins: [],
}