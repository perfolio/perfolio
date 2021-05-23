module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier", "jsdoc"],
  rules: {
    "prettier/prettier": "error",
    /**
     * This project is using typescript, thus we can ignore prop types.
     */
    "react/prop-types": "off",
    /**
     * Every function should have basic annotation.
     * Types must not be defined in jsdoc, because typescript should be the
     * single source of truth.
     */
    "jsdoc/check-access": "error",
    "jsdoc/check-alignment": "error",
    "jsdoc/check-examples": "error",
    "jsdoc/check-indentation": "off",
    "jsdoc/check-line-alignment": "error",
    "jsdoc/check-param-names": "error",
    "jsdoc/check-property-names": "error",
    "jsdoc/check-syntax": "error",
    "jsdoc/check-tag-names": "error",
    "jsdoc/check-types": "off",
    "jsdoc/check-values": "error",
    "jsdoc/empty-tags": "error",
    "jsdoc/implements-on-classes": "error",
    "jsdoc/match-description": "off",
    "jsdoc/newline-after-description": "error",
    "jsdoc/no-bad-blocks": "error",
    "jsdoc/no-defaults": "error",
    "jsdoc/no-types": "error",
    "jsdoc/no-undefined-types": "error",
    "jsdoc/require-asterisk-prefix": "error",
    "jsdoc/require-description-complete-sentence": "error",
    "jsdoc/require-description": "error",
    "jsdoc/require-example": "off",
    "jsdoc/require-file-overview": "off",
    "jsdoc/require-hyphen-before-param-description": "error",
    "jsdoc/require-jsdoc": "error",
    "jsdoc/require-param-description": "off",
    "jsdoc/require-param-name": "off",
    "jsdoc/require-param-type": "off",
    "jsdoc/require-param": "off",
    "jsdoc/require-property-description": "error",
    "jsdoc/require-property-name": "error",
    "jsdoc/require-property-type": "error",
    "jsdoc/require-property": "error",
    "jsdoc/require-returns-check": "off",
    "jsdoc/require-returns-description": "error",
    "jsdoc/require-returns-type": "off",
    "jsdoc/require-returns": "off",
    "jsdoc/require-throws": "off",
    "jsdoc/require-yields-check": "error",
    "jsdoc/require-yields": "error",
    "jsdoc/valid-types": 1,
  },
}
