import { useAuthenticatedSession, useQuery } from "blitz"
import getCompany from "app/companies/queries/getCompany"

export const useCompany = (symbol: string | undefined) => {
  const sess = useAuthenticatedSession()

  return useQuery(
    getCompany,
    { symbol: symbol! },
    { enabled: !!sess.userId && !!symbol, suspense: false },
  )
}
