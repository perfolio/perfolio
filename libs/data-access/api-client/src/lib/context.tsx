import React, { useState } from "react"
import { Api } from "./api"

export const ApiContext = React.createContext<{
  getApi: () => Api | null
  setApi: (api: Api) => void
}>({
  getApi: () => null,
  setApi: () => {
    throw new Error("Implement me")
  },
})

export const ApiProvider: React.FC = ({ children }) => {
  const [api, setApi] = useState<Api | null>(null)

  return <ApiContext.Provider value={{ setApi, getApi: () => api }}>{children}</ApiContext.Provider>
}
