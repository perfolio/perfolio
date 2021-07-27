import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, from } from "@apollo/client"
import { useClerk } from "@clerk/clerk-react"
import { setContext } from "@apollo/client/link/context"
import React, { useState, useEffect } from "react"
import { JWT } from "@perfolio/feature/tokens"
import { HTTPError, JsonUnmarshalError } from "@perfolio/util/errors"

const getNewToken = async (sessionId: string): Promise<string> => {
  const path = "/api/auth/access-token"
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ sessionId }),
  })
  if (!res.ok) {
    throw new HTTPError(res.status, path)
  }

  const { accessToken } = await res.json().catch((err) => {
    throw new JsonUnmarshalError(err)
  })
  return accessToken
}

/**
 * Refreshes the access token if necessary, otherwise it returns the cached one
 */
const ensureToken = async (
  token: string | undefined,
  setToken: (token: string) => void,
  sessionId: string,
): Promise<string> => {
  if (!token || JWT.expiresIn(token) < 10) {
    const accessToken = await getNewToken(sessionId)
    setToken(accessToken)
    return accessToken
  }
  return token
}

export const Provider: React.FC = ({ children }): JSX.Element => {
  const clerk = useClerk()
  const [token, setToken] = useState<string | undefined>(undefined)

  /**
   * Fetch the first token when mounting the provider.
   *
   *
   */
  useEffect(() => {
    if (clerk?.session?.id) {
      ensureToken(token, setToken, clerk.session.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerk?.session?.id])

  const perfolioApi = process.env["NEXT_PUBLIC_PERFOLIO_API"]

  const httpLink = createHttpLink({
    uri: `${perfolioApi}/api/graphql`,
  })

  /**
   * Inject a jwt into the authorization header
   */
  const authMiddleware = setContext((_operation, { headers }) => {
    if (!clerk?.session?.id) {
      return headers
    }
    return ensureToken(token, setToken, clerk.session.id).then((token) => {
      return {
        headers: {
          ...headers,
          authorization: token,
        },
      }
    })
  })

  const client = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
