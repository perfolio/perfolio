import { useQuery, useAuthenticatedSession } from "blitz"
import getSymbolFromIsin from "app/symbols/queries/getSymbolFromIsin"
export const useSymbol = (isin: string) => {
  const sess = useAuthenticatedSession()

  const [symbol, meta] = useQuery(
    getSymbolFromIsin,
    { isin },
    {
      enabled: !!sess.userId && RegExp(/[A-Z]{2}[a-zA-Z0-9]{10}/).test(isin),
      suspense: false,
    },
  )
  return { symbol, ...meta }
}
