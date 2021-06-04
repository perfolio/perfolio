import { useQuery, useSession } from "blitz"
import getCompany from "app/companies/queries/getCompany"

export const useCompany = (symbol: string | undefined) => {
  const sess = useSession()

  const [company, { isLoading, error }] = useQuery(
    getCompany,
    { symbol: symbol! },
    { enabled: !!sess.userId && !!symbol, suspense: false },
  )

  return { company: company?.company, isLoading, error }
}
