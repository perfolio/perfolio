import { withMiddleware } from '@perfolio/api';

import { db } from '@perfolio/db';
import { z } from 'zod';
import { getIsinMapping, getVolumeByVenue } from '@perfolio/iexcloud';

export const GetSymbolRequestValidation = z.object({
  isin: z.string(),
});

export type GetSymbolRequest = z.infer<typeof GetSymbolRequestValidation>;

async function getSymbolApiHandler({ isin }: GetSymbolRequest) {
  const symbol = await db().symbol.fromIsin(isin);
  if (symbol) {
    return symbol;
  }

  const possibleSymbols = await getIsinMapping(isin);

  /**
   * If there is a symbol with neither a country prefix (`US_`) or exchange suffix (`-ch`)
   * we could assume that's the main one.
   */
  const quickFind = possibleSymbols.find(
    (symbol) => !symbol.symbol.includes('_') && !symbol.symbol.includes('-')
  );
  if (quickFind) {
    return { symbol: quickFind.symbol };
  }

  /**
   * Search biggest venue for each symbol
   */
  const bestSymbol = (
    await Promise.all(
      possibleSymbols.map(async (symbol) => {
        const venues = await getVolumeByVenue(symbol.symbol);
        return {
          volume: venues.sort((a, b) => b.volume - a.volume)[0].volume,
          symbol: symbol.symbol,
        };
      })
    )
  ).sort((a, b) => b.volume - a.volume)[0];
  return db().symbol.create({
    symbol: bestSymbol.symbol,
    isin: isin,
  });
}

export default withMiddleware(getSymbolApiHandler, GetSymbolRequestValidation);
