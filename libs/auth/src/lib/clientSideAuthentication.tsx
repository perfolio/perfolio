import { NextPage } from "next"
import { useSession } from "./hook"

export type ClientSideAuthenticationConfig = {
  redirect: {
    authenticated?: string
    anonymous?: string
  }
}
/**
 * Redirects the user to the `redirect` page specified in the options
 * when no token was found.
 */
export function withClientSideAuthentication(
  Page: NextPage,
  config?: ClientSideAuthenticationConfig,
): NextPage {
  return function Wrap(props) {
    const { session, isLoading } = useSession()

    if (isLoading) {
      return <Page {...props} />
    }

    if (typeof window === "undefined") {
      return <Page {...props} />
    }

    /**
     * Must be clientside and finished loading
     */
    let destination
    if (session) {
      destination = config?.redirect.authenticated
    } else {
      destination = config?.redirect.anonymous
    }
    if (destination) {
      window?.location.assign(destination)
    }

    return <Page {...props} />
  }
}
