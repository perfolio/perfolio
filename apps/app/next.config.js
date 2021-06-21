// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx")

module.exports = withNx({
  env: {
    NEXTAUTH_URL: process.env.NX_NEXTAUTH_URL,
  },
})
