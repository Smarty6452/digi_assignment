/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5C218B",
        secondary: "#F4F4F4",
        tertiary: "#FFF8B7",
        gray: "#717070",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/heroimg.png') ",
      },
    },
  },
  plugins: [],
};
