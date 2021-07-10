import { useContext } from "react"
import { JWTContext } from "./context"
import { Api } from "./api"
import { useSession } from "@clerk/clerk-react"

export const useApi = (): Api => {
  const ctx = useContext(JWTContext)
  const session = useSession()
  return new Api({ ...ctx, sessionId: session.id })
}
