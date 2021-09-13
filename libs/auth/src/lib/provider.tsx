import React, { createContext, useContext, useState } from "react"
import { Claims } from ".."
import { JWT } from "./jwt"
import { TokenRefreshRequester } from "./refreshRequester"
const ERR_AUTHPROVIDER_INIT = new Error("Please wrap your app with the AuthProvider")

/**
 * AuthHook offers methods to get and set a fauna token.
 */
const AuthContext = createContext<{
  getAccessToken: () => Promise<string>

  clearToken: () => void
}>({
  getAccessToken: () => {
    throw ERR_AUTHPROVIDER_INIT
  },
  clearToken: () => {
    throw ERR_AUTHPROVIDER_INIT
  },
})

interface AuthProviderProps {
  accessToken?: string
}

/**
 * AuthProvider should be wrapped around your app in /pages/_app.ts.
 *
 * This sets up the JWT auth context.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children, accessToken }) => {
  const [token, setToken] = useState<string | undefined>(accessToken)
  const getAccessToken = async () => {
    if (token && JWT.expiresIn(token) > 10) {
      return token
    }
    const tokenRequester = TokenRefreshRequester.new()
    const { accessToken } = await tokenRequester.refreshAccessToken()

    setToken(accessToken)
    return accessToken
  }

  return (
    <AuthContext.Provider value={{ getAccessToken, clearToken: () => setToken(undefined) }}>
      {children}
    </AuthContext.Provider>
  )
}

export type AuthHook = {
  getAccessToken: () => Promise<string>
  clearToken: () => void
  getClaims: (accessToken?: string) => Promise<Claims>
}

export const useAuth = (): AuthHook => {
  const ctx = useContext(AuthContext)

  return {
    ...ctx,
    getClaims: async (accessToken) => JWT.decode(accessToken ?? (await ctx.getAccessToken())),
  }
}
