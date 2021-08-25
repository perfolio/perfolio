import { NextPage } from "next"
import { useAccessToken } from "@perfolio/hooks"
import { Loading } from "@perfolio/ui/components"

export interface WithAuthenticationRequiredOptions {
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
  Page: NextPage,
  opts?: WithAuthenticationRequiredOptions,
): NextPage {
  return function Wrap(props) {
    const { accessToken, isLoading } = useAccessToken()
    if (isLoading) {
      return (
        <div className="flex items-center justify-center w-screen h-screen text-gray-700">
          <Loading />
        </div>
      )
    }
    if (!accessToken) {
      window.location.assign(opts?.returnTo ?? "/auth/sign-in")
    }

    return <Page {...props} />
  }
}
