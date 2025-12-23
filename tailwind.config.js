/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#BBEDED',
        'primary-dark': '##BBEDED',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}