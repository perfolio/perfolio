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
        DEFAULT: "#2F49CF",
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

      success: {
        50: "#ECFDF5",
        100: "#D1FAE5",
        200: "#A7F3D0",
        300: "#6EE7B7",
        400: "#34D399",
        500: "#10B981",
        600: "#059669",
        700: "#047857",
        800: "#065F46",
        900: "#064E3B",
      },
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
      error: {
        50: "#FFF1F2",
        100: "#FFE4E6",
        200: "#FECDD3",
        300: "#FDA4AF",
        400: "#FB7185",
        500: "#F43F5E",
        600: "#E11D48",
        700: "#BE123C",
        800: "#9F1239",
        900: "#881337",
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
