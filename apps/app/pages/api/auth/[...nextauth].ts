// eslint-disable-next-line
// @ts-nocheck

import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import * as Fauna from "faunadb"
import { FaunaAdapter } from "@perfolio/fauna-adapter"
const faunaClient = new Fauna.Client({
  secret: process.env.NX_FAUNA_SERVER_KEY,
})

export default NextAuth({
  debug: false,
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/check-your-email",
  },
  providers: [
    Providers.Email({
      server: {
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: "apikey",
          pass: process.env.NX_SENDGRID_TOKEN,
        },
      },
      from: "noreply@perfol.io",
    }),
  ],
  adapter: FaunaAdapter(faunaClient),
})
