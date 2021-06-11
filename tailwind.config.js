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
      black: colors.black,
      gray: colors.gray,
      primary: {
        100: "#E5E0F8",
        200: "#CBC2F2",
        300: "#A498D8",
        400: "#7A70B1",
        500: "#49407D",
        600: "#362E6B",
        700: "#262059",
        800: "#191448",
        900: "#100C3B",
      },
      secondary: colors.amber,
      success: colors.emerald,
      info: {
        100: "#C8F0F9",
        200: "#93DCF4",
        300: "#5AB7DE",
        400: "#318CBE",
        500: "#025793",
        600: "#01437E",
        700: "#013269",
        800: "#002355",
        900: "#001946",
      },
      error: colors.rose,
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
    require("tailwindcss-debug-screens"),
  ],
}
