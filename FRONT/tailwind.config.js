const { heroui } = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|input|select|popover|ripple|spinner|form|listbox|divider|scroll-shadow).js"
  ],
  theme: {},
  plugins: [heroui()],
};
