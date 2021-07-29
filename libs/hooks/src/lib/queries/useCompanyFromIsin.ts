import { useAccessToken } from "./useAccessToken"
import { useQuery } from "react-query"
import { GetCompanyFromIsinQueryVariables, GetCompanyFromIsinQuery } from "@perfolio/api/graphql"
import { client } from "../client"

export const useCompanyFromIsin = (variables: GetCompanyFromIsinQueryVariables) => {
  const { token } = useAccessToken()

  const { data, ...meta } = useQuery<GetCompanyFromIsinQuery, Error>(
    ["getCompanyFromIsin", variables],
    () => client(token!).getCompanyFromIsin(variables),
    {
      enabled: !!token,
    },
  )

  return { company: data?.getCompanyFromIsin, ...meta }
}
