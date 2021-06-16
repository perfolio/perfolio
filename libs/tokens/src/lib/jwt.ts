import jwt from "jsonwebtoken"

import { z } from "zod"

export class JWT {
  private static readonly issuer = "perfolio"
  private static readonly audience = "perfolio"
  private static readonly secret = process.env.NX_JWT_SIGNING_KEY
  private static readonly algorithm = "HS256"

  public static sign(
    data: Record<string, string | number>,
    subject: string,
    /**
     * @example `15m`
     */
    expiresIn: string,
  ): string {
    if (!JWT.secret) throw new Error("`NX_JWT_SIGNING_KEY` must be defiend")

    return jwt.sign(data, JWT.secret, {
      subject,
      expiresIn,
      algorithm: JWT.algorithm,
      audience: JWT.audience,
      issuer: JWT.issuer,
    })
  }

  public static verify(encoded: string, validator: z.ZodAny): z.infer<typeof validator> {
    if (!JWT.secret) throw new Error("`NX_JWT_SIGNING_KEY` must be defiend")

    const decoded = jwt.verify(encoded, JWT.secret, {
      audience: JWT.audience,
      issuer: JWT.issuer,
    })

    return validator.parse(decoded)
  }
}
