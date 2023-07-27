/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const rotateY = plugin(function ({ addUtilities }) {
    addUtilities({
        ".rotate-y-90": {
            transform: "rotateY(90deg)",
        },
        ".rotate-y-0": {
            transform: "rotateY(0deg)",
        },
    });
});

export const content = ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"];
export const theme = {
    extend: {
        colors: {
            orange: "#FF862E",
            lightBlue: "#7AD0DF",
            rose: "#FF7D97",
            correctGreen: "#41C503",
            wrongRed: "#FD0000",
            subHeadingGray: "#535353",
        },
    },
    fontFamily: {
        sans: ["'Fuzzy Bubbles'", "cursive"],
    },
};
export const plugins = [rotateY];
