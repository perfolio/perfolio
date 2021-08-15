// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")

module.exports = withNx({
  webpack: (config, { isServer }) => {
    //  Fixes npm packages that depend on `child_process` module
    if (!isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.child_process = false
    }

    return config
  },
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: "/api/graphql",
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/api/graphql",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Headers", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "*" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
    ]
  },
})
