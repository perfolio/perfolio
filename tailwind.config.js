/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  purge: ["./**/*.{ts,tsx,html}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "current",
      white: "#ffffff",
      black: colors.warmGray["900"],
      gray: {
        lightest: colors.warmGray["50"],
        lighter: colors.warmGray["100"],
        light: colors.warmGray["300"],
        dark: colors.warmGray["600"],
        darker: colors.warmGray["800"],
      },
      primary: {
        lighter: colors.violet["50"],
        light: colors.violet["300"],
        dark: colors.violet["700"],
        darker: colors.violet["800"],
      },
      secondary: {
        lighter: colors.amber["50"],
        light: colors.amber["300"],
        dark: colors.orange["500"],
        darker: colors.amber["800"],
      },
      success: {
        lighter: colors.emerald["50"],
        light: colors.emerald["300"],
        dark: colors.emerald["600"],
        darker: colors.emerald["800"],
      },
      info: {
        lighter: colors.cyan["50"],
        light: colors.cyan["300"],
        dark: colors.cyan["600"],
        darker: colors.cyan["800"],
      },
      error: {
        lighter: colors.rose["50"],
        light: colors.rose["300"],
        dark: colors.rose["600"],
        darker: colors.rose["800"],
      },
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
