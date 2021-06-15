// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")
const { withSentryConfig } = require("@sentry/nextjs")

module.exports = withNx(
  withSentryConfig(
    {},
    {
      org: "chronark",
      project: "app-perfolio",
      authToken: process.env.NX_SENTRY_AUTH_TOKEN,
    },
  ),
)
