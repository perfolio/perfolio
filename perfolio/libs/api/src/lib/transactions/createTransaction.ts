import { db } from '@perfolio/db';
import { z } from 'zod';
import { Transaction } from '@perfolio/db';
import { useMutation, useQueryClient } from 'react-query';
import { request } from '../api';
import { Claims, useAuth } from '@perfolio/auth';

export const CreateTransactionRequestValidation = Transaction.schema.omit({
  userId: true,
});

export type CreateTransactionRequest = z.infer<
  typeof CreateTransactionRequestValidation
>;

export type CreateTransactionResponse = z.infer<typeof Transaction.schema>;

export async function createTransactionApiHandler(
  { value, assetId, executedAt, volume }: CreateTransactionRequest,
  claims: Claims
) {
  return await db().transaction.create({
    userId: claims.userId,
    value,
    assetId,
    executedAt,
    volume,
  });
}

export function useCreateTransaction() {
  const { getToken } = useAuth();
  const token = getToken();
  const queryClient = useQueryClient();

  return useMutation<Transaction, Error, CreateTransactionRequest>({
    mutationFn: (variables: CreateTransactionRequest) => {
      return request<Transaction>({
        token,
        path: '/api/transactions/getTransactions',
        body: CreateTransactionRequestValidation.parse(variables),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries('transactions');
    },
  });
}
