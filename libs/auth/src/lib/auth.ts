import jwt from "jsonwebtoken"
import { z } from "zod"
import jwksClient from "jwks-rsa"

export const payload = z.object({
  iss: z.string(),
  iat: z.number(),
  exp: z.number().int(),
  aud: z.array(z.string()),
  sub: z.string(),
  scope: z.string(),
  permissions: z.array(z.string()),
})

export type Claims = z.infer<typeof payload>
export class JWT {
  private static instance: JWT
  private jwks: jwksClient.JwksClient
  private audience: string
  private issuer: string
  private constructor(jwksUri: string, claims: { audience: string; issuer: string }) {
    this.jwks = jwksClient({
      jwksUri,
    })
    this.audience = claims.audience
    this.issuer = claims.issuer
  }

  public static getInstance(): JWT {
    if (!JWT.instance) {
      throw new Error("JWT is not yet initialized")
    }
    return JWT.instance
  }

  public static init(jwksUri: string, claims: { audience: string; issuer: string }): JWT {
    if (JWT.instance) {
      throw new Error(`JWT is already initialized`)
    }
    JWT.instance = new JWT(jwksUri, claims)
    return JWT.instance
  }

  public async verify(encoded: string): Promise<Claims> {
    const { header } = JWT.decode(encoded)
    const key = await this.jwks.getSigningKey(header.kid)

    const decoded = jwt.verify(encoded, key.getPublicKey(), {
      audience: this.audience,
      issuer: this.issuer,
    })
    console.log({ decoded })
    return payload.parse(decoded)
  }
  public async isValid(token: string): Promise<boolean> {
    try {
      await this.verify(token)
      return true
    } catch {
      return false
    }
  }

  public static decode(token: string): jwt.Jwt {
    const decoded = jwt.decode(token, { complete: true })
    if (!decoded) {
      throw new Error(`Unable to decode token: ${token}`)
    }

    return decoded
  }
  /**
   * Return in how many seconds the jwt will expire.
   *
   * Will be negative if it has expired already
   */
  public static expiresIn(token: string): number {
    const { payload } = JWT.decode(token)

    return payload.exp ?? 0 - Math.floor(Date.now() / 1000)
  }
}
