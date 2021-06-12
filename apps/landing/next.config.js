// eslint-disable @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")
const { withSentryConfig } = require("@sentry/nextjs")

module.exports = withNx(
  withSentryConfig(
    {
      nx: {
        svgr: true,
      },
    },
    {},
  ),
)
