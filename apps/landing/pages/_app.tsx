import React from "react"
import { AppProps } from "next/app"
import Head from "next/head"
import PlausibleProvider from "next-plausible"
import { I18nProvider } from "@perfolio/feature/i18n"

import "tailwindcss/tailwind.css"

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="perfol.io">
      <I18nProvider>
        <Head>
          <title>Perfolio</title>
          <meta name="description" content="Insights. For Everyone." />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/fav/favicon_96x96_dark_mode.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/fav/favicon_32x32_dark_mode.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/fav/favicon_16x16_dark_mode.png"
          ></link>
        </Head>
        <Component {...pageProps} />
      </I18nProvider>
    </PlausibleProvider>
  )
}

export default CustomApp
