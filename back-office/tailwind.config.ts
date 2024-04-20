/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2127BC",
        secondary: "#002966",
        tertiary: "#343666",
        quaternary: "#1A75FF",
        black: "#1D1D1D",
      },
      container: {
        center: true,
        padding: {
          default: "2rem",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        syne: ["Syne", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), nextui()],
};
