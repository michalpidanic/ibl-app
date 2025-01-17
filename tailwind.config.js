/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "599px" },
        sm: { min: "600px", max: "959px" },
        md: { min: "960px", max: "1279px" },
        lg: { min: "1280px", max: "1919px" },
        xl: { min: "1920px" },
        "lt-sm": { max: "599px" },
        "lt-md": { max: "959px" },
        "lt-lg": { max: "1279px" },
        "lt-xl": { max: "1919px" },
        "gt-xs": { min: "600px" },
        "gt-sm": { min: "600px" },
        "gt-md": { min: "960px" },
        "gt-lg": { min: "1280px" },
      },
    },
    plugins: [require("@tailwindcss/forms")],
  },
};
