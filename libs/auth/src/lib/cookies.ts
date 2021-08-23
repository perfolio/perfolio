import { serialize } from "cookie"
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import { Time } from "@perfolio/util/time"
import Iron from "@hapi/iron"
import { env } from "@perfolio/util/env"

const TOKEN_NAME = "PERFOLIO_SESSION"
const MAX_AGE = Time.toSeconds("7d") // 7 hours

/**
 * Save a cookie to the user's browser.
 */
export function setCookie(res: NextApiResponse, value: string): void {
  const cookie = serialize(TOKEN_NAME, value, {
    /**
     * HTTP-ONLY cookies can only be read server side.
     */
    httpOnly: true,
    maxAge: MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  res.setHeader("Set-Cookie", cookie)
}

/**
 * Delete a cookie from the user's browser.
 */
export function removeCookie(res: NextApiResponse): void {
  const cookie = serialize(TOKEN_NAME, "", {
    httpOnly: true,
    maxAge: -1,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
  res.setHeader("Set-Cookie", cookie)
}

export const ERR_TOKEN_NOT_FOUND = new Error("No token is found in your cookies")

/**
 * Overload for getServersideProps.
 */
export function getCookie(ctx: GetServerSidePropsContext): string
/**
 * Overload for api routes.
 */
export function getCookie(req: NextApiRequest): string
/**
 * Load a fauna token from cookies.
 * Works with next api routes and getServerSideProps.
 *
 * @throws ERR_TOKEN_NOT_FOUND.
 */
export function getCookie(arg0: GetServerSidePropsContext | NextApiRequest): string {
  const cookies: Record<string, string> =
    "cookies" in arg0
      ? (arg0 as NextApiRequest).cookies
      : (arg0 as GetServerSidePropsContext).req.cookies

  const token = cookies[TOKEN_NAME]
  if (!token) {
    throw ERR_TOKEN_NOT_FOUND
  }
  return token
}

export async function seal(sessionToken: string): Promise<string> {
  return await Iron.seal({ sessionToken }, env.require("COOKIE_SECRET"), Iron.defaults)
}
export async function unseal(cookie: string): Promise<{ sessionToken: string }> {
  return (await Iron.unseal(cookie, env.require("COOKIE_SECRET"), Iron.defaults)) as {
    sessionToken: string
  }
}
