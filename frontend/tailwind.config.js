/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        card_color: "linear-gradient(to right top, #b3daf8, #aee3fd, #abebff, #aaf3fe, #adfbfc)",
        card: "linear-gradient(to right top, #c3bdc0, #cabfc8, #cec2d2, #cec5dd, #cacae9, #c4d0f1, #bed6f8, #b6ddfd, #b3e5fe, #b3ecfd, #b7f3fa, #bff9f6)",
      }
    },
  },
  plugins: [],
}

