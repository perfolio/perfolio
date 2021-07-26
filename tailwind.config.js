/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  purge: ["./**/*.{tsx,html}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: colors.current,
      white: colors.white,
      black: "#0C0C0C",
      gray: {
        50: "#FAFAFA",
        100: "#F4F4F5",
        200: "#E4E4E7",
        300: "#D4D4D8",
        400: "#A1A1AA",
        500: "#71717A",
        600: "#52525B",
        700: "#3F3F46",
        800: "#27272A",
        900: "#18181B",
      },
      primary: {
        light: "#B0BCF9",
        DEFAULT: "#3548c8",
        dark: "#101974",
      },

      success: {
        light: "#CAFAD0",
        DEFAULT: "#37C475",
        dark: "#025B4C",
      },
      info: {
        light: "#D4E7FE",
        DEFAULT: "#2B6AF2",
        dark: "#0D298C",
      },
      error: {
        light: "#FDE4D3",
        DEFAULT: "#E83727",
        dark: "#860C20",
      },
    },

    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        system: defaultTheme.fontFamily.sans,
      },
      boxShadow: {
        evil: "1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)",
      },
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/custom-forms"),
    require("tailwindcss-debug-screens"),
  ],
}
