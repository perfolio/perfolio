import { QueryResponse } from './util';
import { Document } from './document';
import { Client, Expr, query as q } from 'faunadb';
import { z } from 'zod';

export class Transaction extends Document<z.infer<typeof Transaction.schema>> {
  public static readonly collection = 'transactions';
  public static readonly index = {
    byUserId: 'transactions_by_user_id',
    byId: 'transaction_by_id',
  };

  /**
   * Data type for transactions
   */
  public static readonly schema = z
    .object({
      /**
       * Isin for stock assets
       */
      assetId: z.string().regex(/[A-Z]{2}[a-zA-Z0-9]{10}/, 'Invalid isin'),
      userId: z.string(),
      volume: z.number(),
      value: z.number().positive(),
      executedAt: z.number().int(),
    })
    .strict();

  /**
   * Load a transaction by its id
   */
  public static async fromId(
    client: Client,
    id: string
  ): Promise<Transaction | null> {
    try {
      const res = await client
        .query<QueryResponse<z.infer<typeof Transaction.schema>>>(
          q.Get(q.Ref(q.Collection(this.collection), id))
        )
        .catch(() => null);

      if (res === null) {
        return null;
      }

      return new Transaction(res);
    } catch (err) {
      throw new Error(`Unable load symbolDocument from symbol: ${err}`);
    }
  }
  /**
   * Load all transactions from a user
   */
  public static async fromUserId(
    client: Client,
    userId: string
  ): Promise<Transaction[]> {
    try {
      const res = await client.query<{
        data: {
          ref: Expr;
          ts: number;
          data: z.infer<typeof Transaction.schema>;
        }[];
      }>(
        q.Map(
          q.Paginate(q.Match(q.Index(Transaction.index.byUserId), userId), {
            size: 100_000,
          }),
          q.Lambda('transactionRef', q.Get(q.Var('transactionRef')))
        )
      );

      return res.data.map((tx) => new Transaction(tx));
    } catch (err) {
      throw new Error(`Unable load transactions from user: ${err}`);
    }
  }

  /**.
   * Create a new transaction document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Transaction.schema>
  ): Promise<Transaction> {
    try {
      const data = Transaction.schema.parse(input);
      const res = await client.query<
        QueryResponse<z.infer<typeof Transaction.schema>>
      >(
        q.Create(q.Collection(Transaction.collection), {
          data: {
            ...data,
            assetId: q.UpperCase(data.assetId),
          },
        })
      );

      return new Transaction(res);
    } catch (err) {
      throw new Error(`Unable create transaction: ${err}`);
    }
  }

  /**
   * Delete this transaction
   */
  public async delete(client: Client): Promise<void> {
    await client
      .query(q.Delete(q.Ref(q.Collection(Transaction.collection), this.id)))
      .catch((err) => {
        throw new Error(`Unable to delete transaction: ${err}`);
      });
  }
}
