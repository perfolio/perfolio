import type { AppProps } from "next/app"
import { Provider as AuthProvider } from "next-auth/client"
import { QueryClientProvider } from "react-query"
import { JWTProvider } from "@perfolio/data-access/api-client"
import { PersistentQueryClient } from "@perfolio/integrations/localstorage"
import Head from "next/head"
import { useSession } from "next-auth/client"
import LogRocket from "logrocket"
import { OnboardingModal } from "@perfolio/app/middleware"
import { IdProvider } from "@radix-ui/react-id"
import "tailwindcss/tailwind.css"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { env } from "@perfolio/util/env"

LogRocket.init("perfolio/app")

function MyApp({ Component, pageProps }: AppProps) {
  const [session] = useSession()
  if (session?.user) {
    LogRocket.identify(session.user.email!, {
      name: session.user.name!,
      email: session.user.email!,
    })
  }

  return (
    <>
      <Head>
        <title>Perfolio</title>
        <meta name="description" content="Insights. For Everyone." />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/fav/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/fav/favicon-16x16.png"></link>
      </Head>
      <IdProvider>
        <ApolloProvider
          client={
            new ApolloClient({
              uri: "http://localhost:8080/api/graphql",
              cache: new InMemoryCache(),
            })
          }
        >
          <QueryClientProvider client={PersistentQueryClient()}>
            <JWTProvider>
              <AuthProvider session={pageProps.session}>
                <OnboardingModal />
                <div className={`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""}`}>
                  <Component {...pageProps} />
                </div>
              </AuthProvider>
            </JWTProvider>
          </QueryClientProvider>
        </ApolloProvider>
      </IdProvider>
    </>
  )
}
export default MyApp
