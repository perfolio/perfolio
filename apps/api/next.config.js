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
})
