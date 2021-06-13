// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")

module.exports = withNx({
  async rewrites() {
    return [
      {
        source: "/:version(v\\d+)/:slug*",
        destination: "/api/:version/:slug*",
      },
    ]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          //  { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "OPTIONS,POST" },
          //  {
          //    key: "Access-Control-Allow-Headers",
          //    value:
          //      "X-CSRF-Token, X-Requested-With, Accept, Authorization, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          //  },
        ],
      },
    ]
  },
})
