module.exports = {
  stories: [],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-links/register",
    "@storybook/addon-essentials/register",
    "@storybook/addon-a11y/register",
    "@storybook/addon-docs/register",
    "@storybook/addon-controls/register",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
}
