import { useQuery, useSession } from "blitz"
import getCompany from "app/companies/queries/getCompany"

export const useCompany = (isin: string) => {
  const sess = useSession()
  const [company, { isLoading: companyLoading }] = useQuery(
    getCompany,
    { isin },
    {
      enabled: !!sess.userId && RegExp(/[A-Z]{2}[a-zA-Z0-9]{10}/).test(isin),
      suspense: false,
    },
  )
  return { company, companyLoading }
}
