/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'Line1': '#f8c300',
        'Line2': '#00923f',
        'Line3': '#0082c9',
        'Line4': '#a21a68',
        'bus': '#da251d',
        'blueNight': '#024182',
        '400SeriesBus': '#808080',
        'streetcar': '#da251d',
        'expressBus': '#00923f'
      },
    },
  },
  plugins: [],
}
