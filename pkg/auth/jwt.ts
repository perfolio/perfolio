import jwt from "jsonwebtoken"
import { z } from "zod"
import { env } from "@chronark/env"

export const payload = z.object({
  iss: z.string(),
  iat: z.number(),
  exp: z.number().int(),
  aud: z.array(z.string()),
  sub: z.string(),
  // roles: z.array(z.enum(["subscription:growth", "subscription:pro", "admin"])),
  permissions: z.array(z.string().nonempty()),
})

export type Claims = z.infer<typeof payload>
export class JWT {
  private static readonly issuer = "https://auth.perfol.io"
  private static readonly audience = "https://api.perfol.io"
  private static readonly algorithm = "HS256"

  public static sign(subject: string, payload: { permissions: string[] }): string {
    const secret = env.require("JWT_SIGNING_KEY")

    return jwt.sign(payload, secret, {
      algorithm: JWT.algorithm,
      expiresIn: "5m",
      audience: JWT.audience,
      issuer: JWT.issuer,
      subject,
    })
  }

  public static verify(encoded: string): Claims {
    const secret = env.require("JWT_SIGNING_KEY")
    const decoded = jwt.verify(encoded, secret, {
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

  public static decode(token: string): Claims {
    const claims = jwt.decode(token)
    if (!claims) {
      throw new Error(`Unable to decode token: ${token}`)
    }
    if (typeof claims === "string") {
      throw new Error(`Unable to parse claims: ${claims}`)
    }
    return payload.parse(claims)
  }
  /**
   * Return in how many seconds the jwt will expire.
   *
   * Will be negative if it has expired already
   */
  public static expiresIn(token: string): number {
    const claims = JWT.decode(token)

    return claims.exp ?? 0 - Math.floor(Date.now() / 1000)
  }

  public static isExpired(token: string): boolean {
    return JWT.expiresIn(token) <= 0
  }
}
