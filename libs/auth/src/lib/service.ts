import { PrismaClient, User } from "@perfolio/integrations/prisma"
import crypto from "crypto"
import { Time } from "@perfolio/util/time"
import bcrypt from "bcrypt"

export type AuthService = {
  createSession: (userId: string) => Promise<{ sessionToken: string }>
  getUserFromSessionToken: (sessionToken: string) => Promise<User>

  createAuthenticationRequest: (email: string) => Promise<{ otp: string }>
  verifyAuthenticationRequest: (email: string, otp: string) => Promise<{ userId: string }>
}

export class Auth implements AuthService {
  private readonly prisma: PrismaClient
  private readonly sessionTTL = Time.toSeconds("7d", { ms: true })
  private readonly authenticationRequestTTL = Time.toSeconds("10m", { ms: true })

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  private sha256(value: string): string {
    return crypto.createHash("sha256").update(value).digest("hex")
  }

  public async createSession(userId: string): Promise<{ sessionToken: string }> {
    const sessionToken = crypto.randomBytes(128).toString("hex")
    const hashedSessionToken = this.sha256(sessionToken)

    // Delete all existing sessions

    const expires = new Date(Date.now() + this.sessionTTL)

    await this.prisma.session.upsert({
      where: { userId },
      update: {
        sessionToken: hashedSessionToken,
        expires,
      },
      create: {
        userId,
        sessionToken: hashedSessionToken,
        expires,
      },
    })

    return { sessionToken }
  }
  public async getUserFromSessionToken(sessionToken: string): Promise<User> {
    const hashedSessionToken = this.sha256(sessionToken)
    // Delete all existing sessions
    const session = await this.prisma.session.findUnique({
      where: { sessionToken: hashedSessionToken },
      include: { user: true },
    })

    if (!session) {
      throw new Error("No active session")
    }

    if (session.expires.getTime() < Date.now()) {
      throw new Error("Session expired")
    }
    return session.user
  }

  public async createAuthenticationRequest(email: string): Promise<{ otp: string }> {
    const otp = crypto.randomInt(0, 999999).toString().padStart(6, "0")

    const expires = new Date(Date.now() + this.authenticationRequestTTL)
    const hashedToken = bcrypt.hashSync(otp, 10)
    await this.prisma.authenticationRequest.upsert({
      where: {
        identifier: email,
      },
      update: {
        token: hashedToken,
        expires,
      },
      create: {
        identifier: email,
        token: hashedToken,
        expires,
      },
    })
    return { otp }
  }
  public async verifyAuthenticationRequest(
    email: string,
    otp: string,
  ): Promise<{ userId: string }> {
    const verificationRequest = await this.prisma.authenticationRequest.findUnique({
      where: {
        identifier: email,
      },
    })
    if (!verificationRequest) {
      throw new Error(`No verification request in database`)
    }
    await this.prisma.authenticationRequest.delete({ where: { id: verificationRequest.id } })

    if (verificationRequest.expires.getTime() < Date.now()) {
      throw new Error("VerificationRequest is no longer valid")
    }

    if (!bcrypt.compareSync(otp, verificationRequest.token)) {
      throw new Error("Token mismatch")
    }

    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new Error("No user found")
    }
    return { userId: user.id }
  }
}
