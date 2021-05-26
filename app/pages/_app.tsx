import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import { LoginForm } from "app/auth/components/LoginForm"
import { ThemeProvider } from "next-themes"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import "tailwindcss/tailwind.css"
import SignupForm from "app/auth/components/SignupForm"
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <ThemeProvider>
      <Suspense fallback="Loading...">
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
  const router = useRouter()
  if (error instanceof AuthenticationError) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <SignupForm onSuccess={resetErrorBoundary} />
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
