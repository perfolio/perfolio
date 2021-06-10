import { request } from '@perfolio/api';
import { useQuery } from 'react-query';
import {
  GetCompanyRequest,
  GetCompanyRequestValidation,
} from '../pages/api/companies/getCompany';
import { Company } from '@perfolio/db';
import { useAuth } from '@perfolio/auth';

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
