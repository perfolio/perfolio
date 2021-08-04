// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")

module.exports = withNx({
  i18n: {
    locales: ["de", "en"],
    defaultLocale: "en",
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      /**
       * Allows us to use `fs` in getServerSideProps
       */
      config.resolve.fallback.fs = false
    }
    return config
  },
})
