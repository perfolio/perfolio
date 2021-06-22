import jwt from "jsonwebtoken"

import { z } from "zod"

export const payload = z.object({
  iss: z.string(),
  iat: z.number(),
  exp: z.number().int(),
  aud: z.string(),
  sub: z.string(),

  userId: z.string(),
})

export type Claims = z.infer<typeof payload>
export class JWT {
  private static readonly issuer = "perfolio"
  private static readonly audience = "perfolio"
  private static readonly secret = process.env.NX_JWT_SIGNING_KEY
  private static readonly algorithm = "HS256"

  public static sign(claims: { userId: string }): string {
    if (!JWT.secret) {
      throw new Error("NX_JWT_SIGNING_KEY must be defined")
    }

    return jwt.sign(claims, JWT.secret, {
      algorithm: JWT.algorithm,
      expiresIn: "15m",
      audience: JWT.audience,
      issuer: JWT.issuer,
      subject: claims.userId,
    })
  }

  public static verify(encoded: string): Claims {
    if (!JWT.secret) {
      throw new Error("NX_JWT_SIGNING_KEY must be defined")
    }

    const decoded = jwt.verify(encoded, JWT.secret, {
      audience: JWT.audience,
      issuer: JWT.issuer,
    })

    return payload.parse(decoded)
  }
  public static isValid(token: string): boolean {
    try {
      JWT.verify(token)
      return true
    } catch {
      return false
    }
  }

  /**
   * Return in how many seconds the jwt will expire.
   *
   * Will be negative if it has expired already
   */
  public static expiresIn(token: string): number {
    const claims = jwt.decode(token)
    if (!claims) {
      throw new Error(`Unable to decode token: ${token}`)
    }
    if (typeof claims === "string") {
      throw new Error(`Unable to parse claims: ${claims}`)
    }

    return claims.exp ?? 0 - Math.floor(Date.now() / 1000)
  }
}
