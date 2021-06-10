import { request } from '@perfolio/api';
import { useQuery } from 'react-query';
import {
  GetSymbolRequest,
  GetSymbolRequestValidation,
} from '../pages/api/symbols/getSymbol';
import { Symbol } from '@perfolio/db';
import { useAuth } from '@perfolio/auth';

export function useSymbol(req: GetSymbolRequest) {
  const { getToken } = useAuth();
  const token = getToken();
  return useQuery<Symbol, Error>(
    `symbol_by_${req.isin}`,
    async () => {
      return request<Symbol>({
        token,
        path: '/api/symbols/getSymbol',
        body: GetSymbolRequestValidation.parse(req),
      });
    },
    {
      enabled: !!token && !!req.symbol,
    }
  );
}
