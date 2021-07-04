import { z } from "zod"
import { search as iexSearch } from "@perfolio/data-access/iexcloud"

export const SearchRequestValidation = z.object({
  fragment: z.string(),
})

export type SearchRequest = z.infer<typeof SearchRequestValidation>
export type SearchResponse = {
  symbol: string
  region: string
  exchange: string
  name: string
  currency: string
}[]
export async function search({ fragment }: SearchRequest): Promise<SearchResponse> {
  return await iexSearch(fragment)
}
