import {
  AppProps,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  Head,
  ErrorComponent,
} from "blitz"
import { ThemeProvider } from "next-themes"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import { FullscreenSpinner } from "app/core/components"
import "tailwindcss/tailwind.css"
import SigninForm from "app/auth/components/SigninForm"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <ThemeProvider>
      <Suspense fallback={<FullscreenSpinner />}>
        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          resetKeys={[router.asPath]}
          onReset={useQueryErrorResetBoundary().reset}
        >
          <Head>
            <title>Perfolio</title>
            <meta
              name="description"
              content="Investment portfolio analytics, aggregating, analyzing and measuring performance of holdings such as stocks, bonds or real estate"
            />
            <link
              rel="stylesheet"
              href="https://rsms.me/inter/inter.css"
            ></link>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/fav/apple-touch-icon.png"
            ></link>
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/fav/favicon-32x32.png"
            ></link>
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/fav/favicon-16x16.png"
            ></link>
            <link rel="manifest" href="/fav/site.webmanifest"></link>
            <link
              rel="mask-icon"
              href="/fav/safari-pinned-tab.svg"
              color="#1A202C"
            ></link>
            <meta name="msapplication-TileColor" content="#1A202C"></meta>
            <meta name="theme-color" content="#1A202C"></meta>

            <link
              rel="alternative"
              hrefLang="en"
              href="https://perfol.io"
            ></link>
            <link
              rel="alternative"
              hrefLang="de"
              href="https://perfol.io/de"
            ></link>
          </Head>

          <Component {...pageProps} />
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <SigninForm onSuccess={resetErrorBoundary} />
      </div>
    )
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={error.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}
