import { NextPage } from "next"
import { useSession } from "next-auth/client"

export interface WithAuthenticationRequiredOptions {
  /**
   * Redirect the user to a login page if they are not authenticated.
   */
  redirect: string
}
/**
 * Redirects the user to the `redirect` page specified in the options
 * when no token was found.
 */
export function withAuthentication(
  Page: NextPage,
  opts?: WithAuthenticationRequiredOptions,
): NextPage {
  return function Wrap(props) {
    const [session, loading] = useSession()

    if (!session && !loading && typeof window !== "undefined") {
      window.location.assign(opts?.redirect ?? "/auth/signin")
    }

    return <Page {...props} />
  }
}
