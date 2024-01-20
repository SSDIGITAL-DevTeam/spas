/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                syne: ['Syne', 'sans-serif'],
            },
        },
        container: {
            center: true,
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
