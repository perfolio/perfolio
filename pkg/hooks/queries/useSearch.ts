import { useQuery } from "react-query"

type Document = {
  id: string
  score: number
  content: {
    asset: {
      id: string
      name: string
      isin: string
      logo: string
      ticker: string
    }
  }
}
type SearchResult = {
  cache: {
    key: string
    hit: boolean
  }
  documents: Document[]
  /**
   * How long the request took in milliseconds
   */
  duration: number
}

export const useSearch = (fragment: string) => {
  const { data, ...meta } = useQuery<SearchResult, Error>(
    ["search", fragment],
    async () =>
      fetch(`https://search.chronark.workers.dev/perfolio?q=${fragment}`).then((res) => res.json()),
    {
      enabled: fragment.length > 0,
      cacheTime: 0,
    },
  )

  return { search: data, ...meta }
}
