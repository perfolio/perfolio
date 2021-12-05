/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    //  Fixes npm packages that depend on `child_process` module
    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    return config
  },
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
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
}
