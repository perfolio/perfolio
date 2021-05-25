import { Company } from ".prisma/client"
import { useQuery } from "react-query"

interface UseCompanyRequest {
  isin: string
}

interface UseCompanyResponse {
  isLoading: boolean
  error: Error | null
  data: Company | undefined
}

/**
 *Fetches data to render a barchart.
 */
export function useCompany(req: UseCompanyRequest): UseCompanyResponse {
  const { data, isLoading, error } = useQuery<Company, Error>(
    ["getCompany", req],
    async () => {
      return fetch(`/api/service/iexcloud/companies/${req.isin}`).then((res) =>
        res.json(),
      )
    },
    { enabled: !!req.isin && RegExp(/[A-Z]{2}[a-zA-Z0-9]{10}/).test(req.isin) },
  )
  return {
    isLoading,
    error,
    data,
  }
}
