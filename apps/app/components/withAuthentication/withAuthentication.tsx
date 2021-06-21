import React from "react"
import { NextPage } from "next"
import { useSession } from "next-auth/client"

/**
 * A spinner animation blocking the entire screen.
 */
const FullscreenSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen text-gray-700">
      <svg width="57" height="57" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg">
        <g fill="fill-current" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle cx="5" cy="50" r="5">
              <animate
                attributeName="cy"
                begin="0s"
                dur="2.2s"
                values="50;5;50;50"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                begin="0s"
                dur="2.2s"
                values="5;27;49;5"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="27" cy="5" r="5">
              <animate
                attributeName="cy"
                begin="0s"
                dur="2.2s"
                from="5"
                to="5"
                values="5;50;50;5"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                begin="0s"
                dur="2.2s"
                from="27"
                to="27"
                values="27;49;5;27"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="49" cy="50" r="5">
              <animate
                attributeName="cy"
                begin="0s"
                dur="2.2s"
                values="50;50;5;50"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                from="49"
                to="49"
                begin="0s"
                dur="2.2s"
                values="49;5;27;49"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </g>
      </svg>
    </div>
  )
}

export interface WithAuthenticationRequiredOptions {
  /**
   * Redirect the user to a login page if they are not authenticated.
   */
  returnTo: string
}
/**
 * Wraps a nextjs page with authentication middleware.
 *
 * Injects the jwt into the auth context or redirects the user to the
 * `returnTo` page specified in the options when no token was found.
 *
 * @example export default withAuthentication(Page)
 *
 */
export function withAuthentication(
  Page: NextPage,
  opts?: WithAuthenticationRequiredOptions,
): NextPage {
  return function Wrap(props) {
    const [session, loading] = useSession()

    if (loading) {
      return <FullscreenSpinner />
    }

    if (!session) {
      window.location.assign(opts?.returnTo ?? "/auth/signin")
    }

    return <Page {...props} />
  }
}
