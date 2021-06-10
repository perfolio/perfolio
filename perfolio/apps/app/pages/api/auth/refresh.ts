import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { db, RefreshToken } from '@perfolio/db';
import { JWT, getTokenFromCookies } from '@perfolio/auth';
import { createHmac } from 'crypto';
import { Logger } from 'tslog';
const refresh = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const logger = new Logger({ name: 'api/auth/refresh' });
  try {
    await z
      .object({
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
    const existingRefreshToken = getTokenFromCookies(req);
    if (!existingRefreshToken) {
      res.status(401);
      throw new Error(`Missing refresh token in cookies`);
    }

    const refreshToken: RefreshToken | null = await db.refreshToken.fromHash(
      createHmac('sha256', existingRefreshToken).digest('hex').toString()
    );
    if (!refreshToken) {
      res.status(500);
      throw new Error(`No refresh token found, please log in again`);
    }

    const user = await db.user.fromId(refreshToken.data.userId);
    if (!user) {
      res.status(500);
      throw new Error(`No user found, please create an account`);
    }

    const accessToken = JWT.sign({
      userId: user.id,
      username: user.data.username,
    });

    res.json({ accessToken });
  } catch (err) {
    logger.error(err.message);
  } finally {
    res.end();
  }
};

export default refresh;
