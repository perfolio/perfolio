// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")
const { withSentryConfig } = require("@sentry/nextjs")

const nextConfig = {}

module.exports = withNx(
  process.env.NODE_ENV === "process"
    ? withSentryConfig(nextConfig, {
        org: "chronark",
        project: "app-perfolio",
        authToken: process.env.NX_SENTRY_AUTH_TOKEN,
      })
    : nextConfig,
)
