import { db } from '@perfolio/db';
import { z } from 'zod';
import { Symbol } from '@perfolio/db';
import { request } from '../api';
import { useAuth } from '@perfolio/auth';
import { useQuery } from 'react-query';

export const GetSymbolRequestValidation = z.object({
  isin: z.string(),
});

export type GetSymbolRequest = z.infer<typeof GetSymbolRequestValidation>;

export async function getSymbolApiHandler({ isin }: GetSymbolRequest) {
  return await db().symbol.fromIsin(isin);
}

export function useSymbol(req: GetSymbolRequest) {
  const { getToken } = useAuth();
  const token = getToken();
  return useQuery<Symbol, Error>(
    `symbol_by_${req.isin}`,
    async () => {
      return request<Symbol>({
        token,
        path: '/api/companies/read',
        body: GetSymbolRequestValidation.parse(req),
      });
    },
    {
      enabled: !!token && !!req.isin,
    }
  );
}
