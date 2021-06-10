import { db } from '@perfolio/db';
import { z } from 'zod';
import { Company } from '@perfolio/db';
import { request } from '../api';
import { useAuth } from '@perfolio/auth';
import { useQuery } from 'react-query';

export const GetCompanyRequestValidation = z.object({
  symbol: z.string(),
});

export type GetCompanyRequest = z.infer<typeof GetCompanyRequestValidation>;

export async function getCompanyApiHandler({ symbol }: GetCompanyRequest) {
  return await db().company.fromSymbol(symbol);
}

export function useCompany(req: GetCompanyRequest) {
  const { getToken } = useAuth();
  const token = getToken();
  return useQuery<Company, Error>(
    `company_by_${req.symbol}`,
    async () => {
      return request<Company>({
        token,
        path: '/api/companies/read',
        body: GetCompanyRequestValidation.parse(req),
      });
    },
    {
      enabled: !!token && !!req.symbol,
    }
  );
}
