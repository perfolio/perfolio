import type { AppProps } from "next/app"
import { QueryClientProvider, QueryClient } from "react-query"
import { JWTProvider } from "@perfolio/data-access/api-client"
// import { PersistentQueryClient } from "@perfolio/integrations/localstorage"
import Head from "next/head"
// import { useSession } from "@perfolio/auth"
import LogRocket from "logrocket"
import { OnboardingModal } from "@perfolio/app/middleware"
import { IdProvider } from "@radix-ui/react-id"
import "tailwindcss/tailwind.css"

LogRocket.init("perfolio/app")

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Perfolio</title>
        <meta name="description" content="Insights. For Everyone." />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/fav/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/fav/favicon-16x16.png"></link>
      </Head>
      <QueryClientProvider client={new QueryClient()}>
        <IdProvider>
          <JWTProvider>
            <OnboardingModal />
            <div className={`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""}`}>
              <Component {...pageProps} />
            </div>
          </JWTProvider>
        </IdProvider>
      </QueryClientProvider>
    </>
  )
}
export default MyApp
