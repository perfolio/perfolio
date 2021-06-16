import { JWT } from "./jwt"
import { UserClaims, UserClaimsValidator } from "./claims"

export class AccessToken {
  public static readonly expiresIn = "15m"

  public static sign(user: UserClaims): string {
    return JWT.sign(user, user.userId, AccessToken.expiresIn)
  }

  public static verify(token: string): UserClaims {
    return JWT.verify(token, UserClaimsValidator)
  }
}
