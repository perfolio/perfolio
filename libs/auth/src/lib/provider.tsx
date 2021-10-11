import React, { createContext, useContext, useState } from "react"
import { Claims } from ".."
import { JWT } from "./jwt"
import { TokenRefreshRequester } from "./refreshRequester"
const ERR_AccessTokenProvider_INIT = new Error("Please wrap your app with the AccessTokenProvider")

/**
 * AuthHook offers methods to get and set a fauna token.
 */
const AccessTokenContext = createContext<{
  getAccessToken: () => Promise<string>

  clearToken: () => void
}>({
  getAccessToken: () => {
    throw ERR_AccessTokenProvider_INIT
  },
  clearToken: () => {
    throw ERR_AccessTokenProvider_INIT
  },
})

interface AccessTokenProviderProps {
  accessToken?: string
}

/**
 * AccessTokenProvider should be wrapped around your app in /pages/_app.ts.
 *
 * This sets up the JWT auth context.
 */
export const AccessTokenProvider: React.FC<AccessTokenProviderProps> = ({
  children,
  accessToken,
}) => {
  const [token, setToken] = useState<string | undefined>(accessToken)
  const getAccessToken = async () => {
    console.log("Loading access token")
    if (token && JWT.expiresIn(token) > 10) {
      return token
    }
    const tokenRequester = TokenRefreshRequester.new()
    const { accessToken } = await tokenRequester.refreshAccessToken()

    setToken(accessToken)
    return accessToken
  }

  return (
    <AccessTokenContext.Provider value={{ getAccessToken, clearToken: () => setToken(undefined) }}>
      {children}
    </AccessTokenContext.Provider>
  )
}

export type AuthHook = {
  getAccessToken: () => Promise<string>
  clearToken: () => void
  getClaims: (accessToken?: string) => Promise<Claims>
}

export const useAccessToken = (): AuthHook => {
  const ctx = useContext(AccessTokenContext)

  return {
    ...ctx,
    getClaims: async (accessToken) => JWT.decode(accessToken ?? (await ctx.getAccessToken())),
  }
}
