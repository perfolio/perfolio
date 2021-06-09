import { Document } from './document';
import { Client, query as q } from 'faunadb';
import { z } from 'zod';
import { QueryResponse } from './util';
import {v4 as uuid} from "uuid"




export class Token extends Document<z.infer<typeof Token.schema>> {
  public static readonly collection = 'tokens';
  public static readonly index = {
    byUserId: 'token_by_user_id',
    byToken: 'token_by_token',
  };

  /**
   * Document schema. How the data is stored in fauna.
   */
  public static  schema = z.object({
    token: z.string(),
    userId: z.string(),
    expiresAt: z.number().int(),
    type: z.enum(['refresh']),
  }).strict()

  /**
   * Fields that can be updated.
   */
  public static readonly update = Token.schema.pick({ expiresAt: true });

  /**
   * Load a token by its unique handle
   */
  public static async fromToken(client: Client, token: string): Promise<Token> {
    try {
      const res = await client.query<
        QueryResponse<z.infer<typeof Token.schema>>
      >(q.Get(q.Collection(this.collection), token));

      if (res === null) {
        return null;
      }

      return new Token(res);
    } catch (err) {
      throw new Error(`Unable load token from token: ${err}`);
    }
  }

  /**
   * Create a new token document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof Token.schema>
  ): Promise<Token> {
    try {
      const data = Token.schema.parse(input);

      const res = await client
        .query<QueryResponse<z.infer<typeof Token.schema>>>(
          q.Create(q.Collection(Token.collection), {
            data: {
              ...data,
              token: uuid()
            },
          })
        )
        .catch((err) => {
          throw new Error(
            `Unable to create token: ${err}, received: ${JSON.stringify(
              data,
              null,
              '  '
            )}`
          );
        });

      return new Token(res);
    } catch (err) {
      throw new Error(`Unable create token: ${err}`);
    }
  }
  /**
   * Update a token document.
   */
  public async update(
    client: Client,
    input: z.infer<typeof Token.update>
  ): Promise<Token> {
    try {
      const data = Token.schema.parse(input);
      const res = await client.query<
        QueryResponse<z.infer<typeof Token.schema>>
      >(
        q.Update(q.Ref(q.Collection(Token.collection), this.id), {
          data,
        })
      );

      return new Token(res);
    } catch (err) {
      throw new Error(`Unable to update token: ${err}`);
    }
  }
  /**
   * Delete this token
   */
  public async delete(client: Client): Promise<void> {
    await client
      .query(q.Delete(q.Ref(q.Collection(Token.collection), this.id)))
      .catch((err) => {
        throw new Error(`Unable to delete token: ${err}`);
      });
  }
}
