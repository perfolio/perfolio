import React, { createContext, useState } from "react"

const ERROR_PROVIDER_NOT_USED = new Error("Please wrap your app with the provider first.")

export interface IJWTContext {
  /**
   * Returns a token if present
   */
  token: string | null
  /**
   * Store a new tokem
   */
  setToken: (token: string) => void
}

/**
 * JWTContext offers methods to get and set a jwt.
 *
 * Do not use this directly!!!
 * Use the `useAccessToken` hook instead
 */
export const JWTContext = createContext<IJWTContext>({
  token: null,
  setToken: () => {
    throw ERROR_PROVIDER_NOT_USED
  },
})

/**
 * JWTProvider should be wrapped around your app in /pages/_app.ts.
 *
 * This sets up the auth context.
 */
export const JWTProvider: React.FC = ({ children }) => {
  /**
   * Increment this version to invalidate the local storage on all clients.
   */
  const [token, setToken] = useState<string | null>(null)
  return (
    <JWTContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </JWTContext.Provider>
  )
}
