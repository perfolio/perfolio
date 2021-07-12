import { useQuery } from "react-query"
import { Company, GetCompanyQuery } from "@perfolio/api/graphql"
import { env } from "@perfolio/util/env"



function fetcher<TData, TVariables>(
  endpoint: string,
  requestInit: RequestInit,
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: "POST",
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0]

      throw new Error(message)
    }

    return json.data
  }
}

export const QUERY_KEY_COMPANY_BY_SYMBOL = (ticker: string): string => `company_by_${ticker}`

export function useCompany(variables:{ticker: string | undefined}) {
  const endpoint = env.require("NEXT_PUBLIC_PERFOLIO_API_URL")

  const {data, ...meta} = useQuery<GetCompanyQuery, Error, Company>(
    ["getCompany", variables],
    fetcher<GetCompanyQuery, GetCompanyQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      GetCompanyDocument,
      variables,
    ),
    options,
}
