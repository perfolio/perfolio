import type { AppProps } from "next/app"
import { QueryClientProvider } from "react-query"
import { PersistendQueryClient } from "@perfolio/app/query-client"
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  ClerkLoaded,
} from "@clerk/clerk-react"
import Head from "next/head"
import { OnboardingModal } from "@perfolio/app/middleware"
import { IdProvider } from "@radix-ui/react-id"
import "tailwindcss/tailwind.css"
import { JWTProvider } from "@perfolio/api/client"
import { useRouter } from "next/router"

const publicPages = ["/subscribe"]

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const frontendApi = process.env["NEXT_PUBLIC_CLERK_FRONTEND_API"]
  if (!frontendApi) {
    throw new Error("NEXT_PUBLIC_CLERK_FRONTEND_API is not defined")
  }
  return (
    <>
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
      <IdProvider>
        <JWTProvider>
          <QueryClientProvider client={PersistendQueryClient()}>
            <ClerkProvider frontendApi={frontendApi} navigate={(to) => router.push(to)}>
              <ClerkLoaded>
                {publicPages.includes(router.pathname) ? (
                  <Component {...pageProps} />
                ) : (
                  <>
                    <SignedIn>
                      <OnboardingModal />
                      <div
                        className={`${
                          process.env.NODE_ENV !== "production" ? "debug-screens" : ""
                        }`}
                      >
                        <Component {...pageProps} />
                      </div>
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                )}
              </ClerkLoaded>
            </ClerkProvider>
          </QueryClientProvider>
        </JWTProvider>
      </IdProvider>
    </>
  )
}
export default MyApp
