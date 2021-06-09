import { useAuthenticatedSession, useQuery } from "blitz"
import getCompany from "app/companies/queries/getCompany"

export const useCompany = (symbol: string | undefined) => {
  const sess = useAuthenticatedSession()

  const [company, meta] = useQuery(
    getCompany,
    { symbol: symbol! },
    { enabled: !!sess.userId && !!symbol, suspense: false },
  )
  return { company, ...meta }
}
