import React, { useState } from "react"

export const JWTContext = React.createContext<{
  getToken: () => string | undefined
  setToken: (token: string) => void
}>({
  getToken: () => undefined,
  setToken: () => {
    throw new Error("Implement me")
  },
})

export const JWTProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(undefined)

  return (
    <JWTContext.Provider
      value={{
        setToken,
        getToken: () => token,
      }}
    >
      {children}
    </JWTContext.Provider>
  )
}
