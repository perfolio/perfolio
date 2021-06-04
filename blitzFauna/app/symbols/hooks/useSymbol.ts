import { useQuery, useSession } from "blitz"
import getSymbolFromIsin from "../queries/getSymbolFromIsin"
export const useSymbol = (isin: string) => {
  const sess = useSession()

  const [symbol, { isLoading, error }] = useQuery(
    getSymbolFromIsin,
    { isin },
    {
      enabled: !!sess.userId && RegExp(/[A-Z]{2}[a-zA-Z0-9]{10}/).test(isin),
      suspense: false,
    },
  )
  return { symbol, isLoading, error }
}
