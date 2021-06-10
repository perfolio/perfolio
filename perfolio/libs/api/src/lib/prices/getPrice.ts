import { db } from '@perfolio/db';
import { z } from 'zod';
import { Price } from '@perfolio/db';
import { request } from '../api';
import { useAuth } from '@perfolio/auth';
import { useQuery } from 'react-query';
import { Time } from '@perfolio/time';
export const GetPriceRequestValidation = z.object({
  symbol: z.string(),
  time: z.number().int(),
});

export type GetPriceRequest = z.infer<typeof GetPriceRequestValidation>;

export async function getPriceApiHandler({ symbol, time }: GetPriceRequest) {
  return await db().price.fromSymbolAndTime(symbol, Time.fromTimestamp(time));
}

export function usePrice(req: GetPriceRequest) {
  const { getToken } = useAuth();
  const token = getToken();
  return useQuery<Price, Error>(
    `price_by_${req.symbol}_and_${req.time}`,
    async () => {
      return request<Price>({
        token,
        path: '/api/price/getPrice',
        body: GetPriceRequestValidation.parse(req),
      });
    },
    {
      enabled: !!token && !!req.symbol,
    }
  );
}
