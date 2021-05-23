/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Next-transpile-modules allows the import of components outside of the nextjs
 * app root.
 *
 * However it does not seem to work with webpack 5 yet.
 */
const withPlugins = require("next-compose-plugins")
const withTM = require("next-transpile-modules")(["@perfolio/components"])
module.exports = withPlugins([withTM()], {})
