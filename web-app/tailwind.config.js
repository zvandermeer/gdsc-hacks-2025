/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['"DM Sans"', 'sans-serif'], // this overrides default sans
        },
      },
    },
    plugins: [],
  }
  