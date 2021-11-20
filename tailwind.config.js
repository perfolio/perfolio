const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  mode: "jit",
  purge: ["./**/*.{tsx,html}"],
  darkMode: "class",
  variants: {
    scale: ["responsive", "hover", "focus", "group-hover"],
  },
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
      secondary: {
        light: "#99EAFF",
        DEFAULT: "#009DFF",
        dark: "#005AB7",
      },

      cta: {
        light: "#FCD34D",
        DEFAULT: "#F59E0B",
        dark: "#EA580C",
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

      warning: {
        light: "#FFEB45",
        DEFAULT: "#FFE207",
        dark: "#DBBF05",
      },
      error: {
        light: "#FF8D75",
        DEFAULT: "#FF1A1A",
        dark: "#B70D2A",
      },
    },

    extend: {
      boxShadow: {
        cta: "0 10px 20px -5px rgba(53, 72, 200, 0.4)",
        ambient: "0 35px 120px -10px rgba(53, 72, 200, 0.1)",
      },
      fontFamily: {
        sans: ["Satoshi-Variable", ...defaultTheme.fontFamily.sans],
        system: defaultTheme.fontFamily.sans,
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/custom-forms"),
    require("tailwindcss-debug-screens"),
  ],
}
