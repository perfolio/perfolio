import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import {v4 as uuid} from "uuid"
import { db } from '@perfolio/fauna';
import { setRefreshCookie } from 'packages/auth/src/cookies';
const signup = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {email, password } = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .parse(req.body);

  const user = await db.user.signin({ email, password});
  const token = await db.token.create({
      userId: user.id,
      token: uuid(),
      type: "refresh",
      expiresAt: Date.now() / 1000 + 30 * 24 * 60 * 60 // 30 days
  })

  setRefreshCookie(res, token.data.token)

  res.end();
};

export default signup;
