import type { AppProps } from "next/app"
import { AuthProvider } from "@perfolio/auth"
import { QueryClient, QueryClientProvider } from "react-query"
import "tailwindcss/tailwind.css"
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <div className={`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""}`}>
          <Component {...pageProps} />;
        </div>
      </AuthProvider>
    </QueryClientProvider>
  )
}
export default MyApp
