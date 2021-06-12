import React from "react"
import { AppProps } from "next/app"
import Head from "next/head"
import "tailwindcss/tailwind.css"

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Perfolio</title>
        <meta name="description" content="Insights. For Everyone." />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link rel="apple-touch-icon" sizes="180x180" href="/fav/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/fav/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/fav/favicon-16x16.png"></link>
        <link rel="manifest" href="/fav/site.webmanifest"></link>
        <link rel="mask-icon" href="/fav/safari-pinned-tab.svg" color="#1A202C"></link>
        <meta name="msapplication-TileColor" content="#1A202C"></meta>
        <meta name="theme-color" content="#1A202C"></meta>
        <script defer data-domain="perfol.io" src="https://plausible.io/js/plausible.js"></script>

      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp
