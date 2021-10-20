import React from "react"
import { AppProps } from "next/app"
import Head from "next/head"
import { I18nProvider } from "@perfolio/feature/i18n"

import "tailwindcss/tailwind.css"
import "../public/fonts/css/satoshi.css"
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider>
      <Head>
        <title>Perfolio</title>
      </Head>
      <Component {...pageProps} />
    </I18nProvider>
  )
}

export default CustomApp
