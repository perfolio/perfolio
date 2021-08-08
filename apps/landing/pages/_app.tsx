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
        </Head>
        <Component {...pageProps} />
      </I18nProvider>
    </PlausibleProvider>
  )
}

export default CustomApp
