import { Document } from './document';
import { Client, query as q } from 'faunadb';
import { z } from 'zod';
import { QueryResponse } from './util';
import { v4 as uuid } from 'uuid';

export class RefreshToken extends Document<
  z.infer<typeof RefreshToken.schema>
> {
  public static readonly collection = 'refresh_tokens';
  public static readonly index = {
    byUserId: 'refresh_token_by_user_id',
    byHash: 'refresh_token_by_hash',
  };

  /**
   * Document schema. How the data is stored in fauna.
   */
  public static schema = z
    .object({
      hashedToken: z.string(),
      userId: z.string(),
      expiresAt: z.number().int(),
    })
    .strict();

  /**
   * Fields that can be updated.
   */
  public static readonly update = RefreshToken.schema.pick({ expiresAt: true });

  /**
   * Load a token by its unique handle
   */
  public static async fromHash(
    client: Client,
    token: string
  ): Promise<RefreshToken> {
    try {
      console.log({ token });
      const res = await client.query<
        QueryResponse<z.infer<typeof RefreshToken.schema>>
      >(q.Get(q.Match(q.Index(this.index.byHash), token)));
      console.log({res})
      if (res === null) {
        return null;
      }

      return new RefreshToken(res);
    } catch (err) {
      throw new Error(`Unable load token from token: ${err}`);
    }
  }
  /**
   * Delete all tokens belonging to a user
   */
  public static async deleteFromUser(
    client: Client,
    userId: string
  ): Promise<void> {
    await client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index(this.index.byUserId), userId)),
          q.Lambda('ref', q.Delete(q.Var('ref')))
        )
      )
      .catch((err) => {
        throw new Error(`Unable load token from token: ${err}`);
      });
  }

  /**
   * Create a new token document.
   */
  public static async create(
    client: Client,
    input: z.infer<typeof RefreshToken.schema>
  ): Promise<RefreshToken> {
    try {
      const data = RefreshToken.schema.parse(input);

      const res = await client
        .query<QueryResponse<z.infer<typeof RefreshToken.schema>>>(
          q.Create(q.Collection(RefreshToken.collection), {
            data: {
              ...data,
              token: uuid(),
            },
          })
        )
        .catch((err) => {
          throw new Error(
            `Unable to create refresh_token: ${err}, received: ${JSON.stringify(
              data,
              null,
              '  '
            )}`
          );
        });

      return new RefreshToken(res);
    } catch (err) {
      throw new Error(`Unable create refresh_token: ${err}`);
    }
  }
  /**
   * Update a token document.
   */
  public async update(
    client: Client,
    input: z.infer<typeof RefreshToken.update>
  ): Promise<RefreshToken> {
    try {
      const data = RefreshToken.schema.parse(input);
      const res = await client.query<
        QueryResponse<z.infer<typeof RefreshToken.schema>>
      >(
        q.Update(q.Ref(q.Collection(RefreshToken.collection), this.id), {
          data,
        })
      );

      return new RefreshToken(res);
    } catch (err) {
      throw new Error(`Unable to update refresh_token: ${err}`);
    }
  }
  /**
   * Delete this token
   */
  public async delete(client: Client): Promise<void> {
    await client
      .query(q.Delete(q.Ref(q.Collection(RefreshToken.collection), this.id)))
      .catch((err) => {
        throw new Error(`Unable to delete refresh_token: ${err}`);
      });
  }
}
