/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"];
export const theme = {
    extend: {
        colors: {
            orange: "#FF862E",
            lightBlue: "#7AD0DF",
        },
    },
    fontFamily: {
        sans: ["'Fuzzy Bubbles'", "cursive"],
    },
};
export const plugins = [];
