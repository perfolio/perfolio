import "tailwindcss/tailwind.css"
import "../public/fonts/css/satoshi.css"
import { I18nProvider } from "next-localization"
import { useRouter } from "next/router"
import type { AppProps } from "next/app"

import { PersistendQueryClient } from "@perfolio/pkg/query-client"
import { ToastProvider } from "@perfolio/pkg/toaster"
import { PageloadIndicator } from "@perfolio/ui/components"
import { QueryClientProvider } from "react-query"
import { AuthProvider } from "@perfolio/pkg/auth"

const Perfolio = ({
  Component,
  pageProps: { accessToken, translations, ...pageProps },
}: AppProps<{ accessToken?: string }>) => {
  const router = useRouter()

  return (
    <I18nProvider lngDict={translations} locale={router.locale ?? "en"}>
      <AuthProvider accessToken={accessToken}>
        <ToastProvider>
          <QueryClientProvider client={PersistendQueryClient()}>
            <div className={`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""}`}>
              <PageloadIndicator />
              <Component {...pageProps} />
            </div>
          </QueryClientProvider>
        </ToastProvider>
      </AuthProvider>
    </I18nProvider>
  )
}

export default Perfolio
