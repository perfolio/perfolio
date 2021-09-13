import { PrismaClient, User } from "@perfolio/integrations/prisma"
import crypto from "crypto"
import { Time } from "@perfolio/util/time"
import { AuthenticationError } from "@perfolio/util/errors"
export type AuthService = {
  createRefreshToken: (userId: string) => Promise<string>
  refreshAccessToken: (refreshToken: string) => Promise<string>
  getUserFromRefreshToken: (refreshToken: string) => Promise<User>

  createAuthenticationRequest: (email: string) => Promise<{ otp: string }>
  verifyAuthenticationRequest: (email: string, otp: string) => Promise<{ userId: string }>
}

export class Auth implements AuthService {
  private readonly prisma: PrismaClient
  private readonly refreshTokenTTL = Time.toSeconds("7d", { ms: true })
  private readonly authenticationRequestTTL = Time.toSeconds("10m", { ms: true })

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  private sha256(value: string): string {
    return crypto.createHash("sha256").update(value).digest("hex")
  }

  public async refreshAccessToken(refreshToken: string): Promise<string> {
    const existingRefreshToken = await this.prisma.refreshToken.update({
      where: { tokenHash: this.sha256(refreshToken) },
      data: {
        used: true,
      },
    })

    return await this.createRefreshToken(existingRefreshToken.userId)
  }

  public async createRefreshToken(userId: string): Promise<string> {
    const refreshToken = crypto.randomBytes(128).toString("hex")

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: this.sha256(refreshToken),
        expires: new Date(Date.now() + this.refreshTokenTTL),
      },
    })

    return refreshToken
  }

  public async getUserFromRefreshToken(token: string): Promise<User> {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { tokenHash: this.sha256(token) },
      include: { user: true },
    })

    if (!refreshToken) {
      throw new Error("No active refreshToken")
    }

    if (refreshToken.used) {
      /**
       * If a refresh token is used multiple times it is likely to be by a 3rd party.
       * Hence we remove all refresh tokens and the user has to log in again.
       */
      await this.prisma.refreshToken.deleteMany({ where: { userId: refreshToken.userId } })
      throw new AuthenticationError("Refresh token was used before")
    }

    return refreshToken.user
  }

  public async createAuthenticationRequest(email: string): Promise<{ otp: string }> {
    const otp = crypto.randomInt(0, 999_999).toString().padStart(6, "0")

    const expires = new Date(Date.now() + this.authenticationRequestTTL)
    const hashedToken = this.sha256(otp)
    const hashedEmail = this.sha256(email)
    await this.prisma.authenticationRequest.upsert({
      where: {
        identifier: hashedEmail,
      },
      update: {
        hashedToken,
        expires,
      },
      create: {
        identifier: hashedEmail,
        hashedToken,
        expires,
      },
    })
    return { otp }
  }
  public async verifyAuthenticationRequest(
    email: string,
    otp: string,
  ): Promise<{ userId: string }> {
    const verificationRequest = await this.prisma.authenticationRequest.delete({
      where: { identifier: this.sha256(email) },
    })
    if (!verificationRequest) {
      throw new Error(`No verification request in database`)
    }

    if (verificationRequest.expires.getTime() < Date.now()) {
      throw new Error("VerificationRequest is no longer valid")
    }

    if (this.sha256(otp) !== verificationRequest.hashedToken) {
      throw new Error("Token mismatch")
    }

    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new Error("No user found")
    }
    return { userId: user.id }
  }
}
