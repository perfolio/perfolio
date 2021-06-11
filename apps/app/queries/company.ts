import { request } from "@perfolio/api"
import { useQuery } from "react-query"
import { GetCompanyRequestValidation } from "../pages/api/companies/getCompany"
import { Company } from "@perfolio/db"
import { useAuth } from "@perfolio/auth"

export function useCompany(symbol: string | undefined) {
  const { getToken } = useAuth()
  const token = getToken()
  const { data, ...meta } = useQuery<Company, Error>(
    `company_by_${symbol}`,
    async () => {
      return request<Company>({
        token,
        path: "/api/companies/getCompany",
        body: GetCompanyRequestValidation.parse({ symbol }),
      })
    },
    {
      enabled: !!token && !!symbol,
    },
  )
  return { company: data, ...meta }
}
