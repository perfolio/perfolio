import React from "react"
import { AppProps } from "next/app"
import Head from "next/head"
import PlausibleProvider from "next-plausible"
import { I18nProvider } from "@perfolio/feature/i18n"
import LogRocket from "logrocket"

import "tailwindcss/tailwind.css"

LogRocket.init("perfolio/landing-ett7w")

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="perfol.io">
      <I18nProvider>
        <Head>
          <title>Perfolio</title>
          <meta name="description" content="Insights. For Everyone." />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/fav/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="/fav/favicon-16x16.png"></link>
        </Head>
        <Component {...pageProps} />
      </I18nProvider>
    </PlausibleProvider>
  )
}

export default CustomApp
