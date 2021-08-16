// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")

module.exports = withNx({
  webpack: (config, { isServer }) => {
    //  Fixes npm packages that depend on `child_process` module
    if (!isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.child_process = false
      config.resolve.fallback["mock-aws-s3"] = false
      config.resolve.fallback["aws-sdk"] = false
    }

    return config
  },
})
