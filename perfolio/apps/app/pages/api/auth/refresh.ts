import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { db, RefreshToken } from '@perfolio/db';
import { JWT, getTokenFromCookies } from '@perfolio/auth';
import {createHmac} from "crypto"
const refresh = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
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
      console.log({existingRefreshToken})
    const refreshToken: RefreshToken | null = await db.refreshToken.fromHash(
      createHmac("sha256", existingRefreshToken).digest("hex").toString()
    );
    console.log({ refreshToken });
    if (!refreshToken) {
      res.status(500);
      throw new Error(`No token found, please log in again`);
    }

    const user = await db.user.fromId(refreshToken.data.userId);

    if (!user) {
      res.status(500);
      throw new Error(`No user found, please log in again`);
    }
    console.log({ user });
    const accessToken = JWT.sign({
      userId: user.id,
      username: user.data.username,
    });
    console.log({ accessToken });
    res.json({ accessToken });
  } catch (err) {
    res.json(err);
  } finally {
    res.end();
  }
};

export default refresh;
