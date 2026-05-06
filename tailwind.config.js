/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#12343B",
        paper: "#F6F4F0",
        sand: "#EFE7DA",
        positive: "#2E7D5B",
        terracotta: "#B85C38",
        ink: "#242424",
      },
    },
  },
  plugins: [],
};
