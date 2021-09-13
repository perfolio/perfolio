import { useState, useEffect } from "react"
import { NextPage } from "next"
import { JWT } from "@perfolio/auth"
import { Loading } from "@perfolio/ui/components"
import { useAuth } from "@perfolio/auth"
import { useRouter } from "next/dist/client/router"
import { AuthenticationError } from "@perfolio/util/errors"
export interface WithAuthenticationRequiredConfig {
  /**
   * Redirect the user to a login page if they are not authenticated.
   */
  returnTo: string
}

/**
 * Wraps a nextjs page with authentication middleware.
 *
 * Injects the fauna token into the fauna context or redirects the user to the
 * `returnTo` page specified in the options when no token was found.
 *
 * @example export default withAuthenticationRequired(Page)
 *
 */
export function withAuthenticationRequired(
  Page: NextPage | any,
  config: WithAuthenticationRequiredConfig = { returnTo: "/auth/sign-in" },
): NextPage {
  return function Wrap(props) {
    const { getAccessToken } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
      setLoading(true)
      getAccessToken()
        .then((accessToken) => {
          if (JWT.isExpired(accessToken)) {
            setError(new AuthenticationError("token has timed out"))
          }
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false))
    }, [getAccessToken])

    if (error) {
      console.error(error)
      router.push(config.returnTo)
    }

    if (loading) {
      return (
        <div className="flex items-center justify-center w-screen h-screen text-gray-700">
          <Loading />
        </div>
      )
    }

    return <Page {...props} />
  }
}
