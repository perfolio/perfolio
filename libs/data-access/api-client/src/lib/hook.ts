import { useContext } from "react"
import { JWTContext } from "./context"
import { Api } from "./api"

export const useApi = (): Api => {
  const ctx = useContext(JWTContext)

  return new Api(ctx)
}
