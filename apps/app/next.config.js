// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")
const { withSentryConfig } = require("@sentry/nextjs")

module.exports = withNx(
  withSentryConfig(
    {
      nx: {
        // Set this to false if you do not want to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: true,
      },
    },
    {
      org: "chronark",
      project: "appperfolio",
      authToken: "cf6c23ce1a7f418fa9d77e7801d01f8944a4a3f30196492ab071df228ac19824",
    },
  ),
)
