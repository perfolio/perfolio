import jwt from 'jsonwebtoken';

import { z } from 'zod';

export const payload = z.object({
  iss: z.string(),
  iat: z.number(),
  exp: z.number().int(),
  aud: z.string(),

  sub: z.string(),

  userId: z.string(),
  username: z.string(),
});

export type Claims = z.infer<typeof payload>
export class JWT {
  private static readonly issuer = 'perfolio';
  private static readonly audience = 'perfolio';
  private static readonly secret = 'secret';
  private static readonly algorithm = 'HS256';

  public static sign(user: { userId: string; username: string }): string {
    return jwt.sign(user, JWT.secret, {
      algorithm: JWT.algorithm,
      expiresIn: '15m',
      audience: JWT.audience,
      issuer: JWT.issuer,
      subject: user.userId,
    });
  }

  public static verify(encoded: string):Claims{
    const decoded = jwt.verify(encoded, JWT.secret, {
      audience: JWT.audience,
      issuer: JWT.issuer,
    });

    return payload.parse(decoded);
  }
}
