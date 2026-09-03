/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        acumin: [
          "acumin-variable",
          '"Acumin Variable Concept"',
          "Arial",
          "Helvetica",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
}
