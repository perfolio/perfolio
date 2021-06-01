import { useCompany } from "./useCompany"
import { useSymbol } from "./useSymbol"

export const useCompanyByIsin = (isin: string) => {
  const { symbol } = useSymbol(isin)

  return useCompany(symbol?.symbol!)
}
