/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  daisyui: {
    themes: ["nord", "dark"],
  },
  plugins: [require("daisyui")],
};
