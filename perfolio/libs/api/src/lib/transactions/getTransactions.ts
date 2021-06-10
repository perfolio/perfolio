import { db } from '@perfolio/db';
import { z } from 'zod';
import { Transaction } from '@perfolio/db';
import { request } from '../api';
import { useAuth, Claims } from '@perfolio/auth';
import { useQuery } from 'react-query';
export const GetTransactionsRequestValidation = z.any();

export async function getTransactionApiHandler(_: void, claims: Claims) {
  return await db().transaction.fromUser(claims.userId);
}

export function useTransactions() {
  const { getToken } = useAuth();
  const token = getToken();
  return useQuery<Transaction[], Error>(
    'transactions',
    async () => {
      const res = await request<Transaction[]>({
        token,
        path: '/api/transactions/getTransactions',
      });
      return res;
    },
    {
      enabled: !!token,
    }
  );
}
