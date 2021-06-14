import type { AppProps } from "next/app"
import { AuthProvider } from "@perfolio/auth"
import { QueryClientProvider } from "react-query"
import { PersistentQueryClient } from "@perfolio/localstorage"
import Head from "next/head"
import "tailwindcss/tailwind.css"
function MyApp({ Component, pageProps }: AppProps) {
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
      </Head>
      <QueryClientProvider client={PersistentQueryClient()}>
        <AuthProvider>
          <div className={`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""}`}>
            <Component {...pageProps} />;
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}
export default MyApp
