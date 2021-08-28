import { serialize } from "cookie"
import { Time } from "@perfolio/util/time"
import Iron from "@hapi/iron"
import { env } from "@chronark/env"

export class SessionCookie {
  private readonly name = "PERFOLIO_SESSION"
  private readonly maxAge = Time.toSeconds("7d")
  private cookies: Record<string, string>
  private setCookie: (cookie: string) => void

  constructor(
    req: { cookies: Record<string, string> },
    res: { setHeader: (name: string, value: string) => void },
  ) {
    this.cookies = req.cookies
    this.setCookie = (cookie: string) => res.setHeader("Set-Cookie", cookie)
  }

  /**
   * Save a cookie to the user's browser.
   */
  async set(sessionToken: string): Promise<void> {
    const cookie = serialize(this.name, await this.seal(sessionToken), {
      /**
       * HTTP-ONLY cookies can only be read server side.
       */
      httpOnly: true,
      maxAge: this.maxAge,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    console.log({ cookie })

    this.setCookie(cookie)
  }

  /**
   * Delete a cookie from the user's browser.
   */
  public remove(): void {
    const cookie = serialize(this.name, "", {
      httpOnly: true,
      maxAge: -1,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    this.setCookie(cookie)
  }

  public async getSessionToken(): Promise<string> {
    const cookie = this.cookies[this.name]
    if (!cookie) {
      throw new Error(`No session cookie found`)
    }
    return await this.unseal(cookie)
  }

  private async seal(sessionToken: string): Promise<string> {
    return await Iron.seal(sessionToken, env.require("COOKIE_SECRET"), Iron.defaults)
  }
  private async unseal(cookie: string): Promise<string> {
    return (await Iron.unseal(cookie, env.require("COOKIE_SECRET"), Iron.defaults)) as string
  }
}
