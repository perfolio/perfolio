import { createContext } from "react"

const ERROR_AUTH_PROVIDER_NOT_INITIALIZED = new Error("Please wrap your app with the AuthProvider")

export interface IAuthContext {
  setToken: (token: string | undefined) => void
  getToken: () => string | undefined
}

/**
 * AuthContext offers methods to get and set a fauna token.
 */
export const AuthContext = createContext<IAuthContext>({
  getToken: () => {
    throw ERROR_AUTH_PROVIDER_NOT_INITIALIZED
  },
  setToken: () => {
    throw ERROR_AUTH_PROVIDER_NOT_INITIALIZED
  },
})
