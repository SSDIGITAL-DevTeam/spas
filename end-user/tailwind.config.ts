import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "2rem",
        },
      },
      fontFamily: {
        intern: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
