import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@perfolio/db';
import { JWT, removeAuthCookie } from '@perfolio/auth';
const signin = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const user = JWT.verify(req.headers.authorization);

  db().refreshToken.deleteFromUser(user.userId);

  removeAuthCookie(res);
  res.json({});

  res.end();
};

export default signin;
