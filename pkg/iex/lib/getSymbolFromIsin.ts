import { Symbol, VolumeTraded } from ".prisma/client"
import db from "db"
import {
  getIsinMapping as getIsinMappingFromCloud,
  getVolumeByVenue as getVolumeByVendorFromCloud,
} from "integrations/iexcloud"
import { NotFoundError } from "blitz"
import * as z from "zod"
import { Time } from "pkg/time"

export const GetSymbolFromIsinValidation = z.object({
  isin: z.string().regex(/[A-Z]{2}[a-zA-Z0-9]{10}/),
})

export type GetSymbolFromIsin = z.infer<typeof GetSymbolFromIsinValidation>

export type GetIsinResponse = {
  symbol: Symbol
}

export async function getSymbolFromIsin(
  req: GetSymbolFromIsin,
): Promise<GetIsinResponse> {
  const possibleSymbols = await getPossibleSymbols(req.isin)

  /**
   * If there is a symbol with neither a country prefix (`US_`) or exchange suffix (`-ch`)
   * we could assume that's the main one.
   */
  const quickFind = possibleSymbols.find(
    (symbol) => !symbol.symbol.includes("_") && !symbol.symbol.includes("-"),
  )
  if (quickFind) {
    return { symbol: quickFind }
  }

  const venues = (
    await Promise.all(
      possibleSymbols.map((symbol) =>
        getVenuesBySymbol(symbol.symbol, req.isin),
      ),
    )
  ).flat()

  const largestVenue = venues.sort((a, b) => a.volume - b.volume)[0]
  if (!largestVenue) {
    throw new NotFoundError()
  }
  return {
    symbol: possibleSymbols.find(
      (symbol) => (symbol.symbol = largestVenue.symbolId),
    )!,
  }
}

async function getVenuesBySymbol(
  symbol: string,
  isin: string,
): Promise<VolumeTraded[]> {
  let venues = await db.symbol
    .findUnique({
      where: { symbol },
    })
    .volumeByExchange()
  if (venues.length === 0) {
    const res = await getVolumeByVendorFromCloud(symbol)
    await Promise.all(
      res.map((venue) =>
        db.exchange.upsert({
          where: {
            mic: venue.venue,
          },
          update: {
            name: venue.venueName,
          },
          create: {
            mic: venue.venue,
            name: venue.venueName,
          },
        }),
      ),
    )
    venues = await Promise.all(
      res.map((venue) =>
        db.volumeTraded.upsert({
          where: {
            symbolId_exchangeId: {
              symbolId: symbol,
              exchangeId: venue.venue,
            },
          },
          update: {
            date: venue.date
              ? Time.fromDate(new Date(venue.date)).unix()
              : undefined,
            volume: venue.volume,
          },
          create: {
            symbol: {
              connectOrCreate: {
                where: { symbol },
                create: {
                  symbol,
                  isin,
                },
              },
            },
            exchange: {
              connectOrCreate: {
                where: { mic: venue.venue },
                create: {
                  mic: venue.venue,
                  name: venue.venueName,
                },
              },
            },
            volume: venue.volume,
            date: venue.date
              ? Time.fromDate(new Date(venue.date)).unix()
              : undefined,
          },
        }),
      ),
    )
  }
  return venues
}

/**
 * Return all symbols associated with this isin.
 */
async function getPossibleSymbols(isin: string): Promise<Symbol[]> {
  let symbols = await db.symbol.findMany({
    where: {
      isin,
    },
  })
  if (symbols.length === 0) {
    const isinMap = await getIsinMappingFromCloud(isin)
    await db.symbol.createMany({
      data: isinMap.map((i) => {
        return {
          symbol: i.symbol,
          isin,
        }
      }),
    })
    symbols = await db.symbol.findMany({
      where: {
        isin,
      },
    })
  }
  if (!symbols) {
    throw NotFoundError
  }
  return symbols
}
