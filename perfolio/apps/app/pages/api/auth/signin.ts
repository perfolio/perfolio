import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { db } from '@perfolio/db';
import { createHmac } from 'crypto';
import { JWT, setRefreshCookie } from '@perfolio/auth';
const signin = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { email, password } = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .parse(req.body);

  const user = await db.user.signin({ email, password });
  const newRefreshToken = uuid();
  await db.refreshToken.create({
    userId: user.id,
    hashedToken: createHmac('sha256', newRefreshToken).digest("hex").toString(),
    expiresAt: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
  });

  setRefreshCookie(res, newRefreshToken);
  res.json({
    accessToken: JWT.sign({ userId: user.id, username: user.data.username }),
  });

  res.end();
};

export default signin;
