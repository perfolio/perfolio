import type { AppProps } from "next/app"
import { QueryClientProvider } from "react-query"
import { PersistendQueryClient } from "@perfolio/app/query-client"
import Head from "next/head"
import { IdProvider } from "@radix-ui/react-id"
import { I18nProvider } from "@perfolio/feature/i18n"
import { ToastProvider } from "@perfolio/toaster"
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"
import { ClerkThemeOptions } from "@clerk/types"
import "tailwindcss/tailwind.css"
import { AccessTokenProvider } from "@perfolio/auth"

const clerkTheme: ClerkThemeOptions = {
  general: {
    color: "#3548c8",
    backgroundColor: "#FAFAFA",
    fontFamily: "Inter, sans serif",
    borderRadius: "0.225rem",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);",
  },
  buttons: {
    fontColor: "#FAFAFA",
    fontFamily: "Inter, sans serif",
    fontWeight: "600",
  },
}

function MyApp({
  Component,
  pageProps: { accessToken, ...pageProps },
}: AppProps<{ accessToken?: string }>) {
  return (
    <I18nProvider>
      <Head>
        <title>Perfolio</title>
      </Head>

      <IdProvider>
        <ClerkProvider theme={clerkTheme}>
          <SignedIn>
            <AccessTokenProvider accessToken={accessToken}>
              <ToastProvider>
                <QueryClientProvider client={PersistendQueryClient()}>
                  <div
                    className={`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""}`}
                  >
                    <Component {...pageProps} />
                  </div>
                </QueryClientProvider>
              </ToastProvider>
            </AccessTokenProvider>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </ClerkProvider>
      </IdProvider>
    </I18nProvider>
  )
}
export default MyApp
