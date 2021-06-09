import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getTokenFromCookies } from 'packages/auth/src/cookies';
import { db,Token } from 'packages/fauna/src';
import jwt from 'jsonwebtoken';
const refresh = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    await z.object({
      method: z
        .string()
        .refine(
          (method) => method.toLowerCase() === 'post',
          'This endpoint only accepts post requests'
        ),
    })
      .parseAsync(req)
      .catch((err) => {
        res.status(400);
        throw err;
      });

    console.log('hello');
    let refreshToken: Token | null = await db.token.fromToken(
      getTokenFromCookies(req)
    );

    if (refreshToken?.data.expiresAt < Date.now() / 1000) {
      await db.token.delete(refreshToken);
      refreshToken = null;
    }

    if (!refreshToken) {
      res.status(500);
      throw new Error(`No token found, please log in again`);
    }

    const user = await db.user.fromId(refreshToken.data.userId);

    if (!user) {
      res.status(500);
      throw new Error(`No user found, please log in again`);
    }
    const payload = {
      exp: Math.floor(Date.now() / 1000) + 60 * 15, // 15 min
      iss: 'perfol.io',
      aud: 'perfol.io',
      userId: user.id,
      name: user.data.name,
    };
    const accessToken = jwt.sign(payload, 'secret', { algorithm: 'RS256' });
    res.json({ accessToken });
  } catch (err) {
    res.json(err);
  } finally {
    res.end();
  }
};

export default refresh;
