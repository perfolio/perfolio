/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  purge: ["./**/*.{ts,tsx,html}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: colors.current,
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      primary: colors.violet,
      secondary: colors.amber,
      success: colors.emerald,
      info: colors.cyan,
      error: colors.rose,
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        system: defaultTheme.fontFamily.sans,
      },
    },
  },
  plugins: [],
}
