import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import { ThemeProvider } from "next-themes"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import { FullscreenSpinner } from "app/core/components"
import "tailwindcss/tailwind.css"
import LoginForm from "app/auth/components/LoginForm"
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
        <LoginForm onSuccess={resetErrorBoundary} />
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
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
