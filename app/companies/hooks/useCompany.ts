import { useQuery, useSession } from "blitz"
import getCompany from "app/companies/queries/getCompany"

export const useCompany = (isin: string) => {
  const sess = useSession()
  const [company, { isLoading: companyLoading }] = useQuery(
    getCompany,
    { isin },
    {
      enabled: !!sess.userId,
      suspense: false,
    },
  )
  return { company, companyLoading }
}
