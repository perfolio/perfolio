import { serialize, parse } from "cookie"
import { NextApiRequest, NextApiResponse } from "next"
import { IncomingMessage } from "http"
/**
 * Save a cookie to the user's browser.
 */
export function setCookie(res: NextApiResponse, name: string, value: string, maxAge: number): void {
  const cookie = serialize(name, value, {
    /**
     * HTTP-ONLY cookies can only be read server side.
     */
    httpOnly: true,
    // domain: process.env.NODE_ENV === "production" ? "perfol.io" : undefined,
    maxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + maxAge * 1000),
  })

  res.setHeader("Set-Cookie", cookie)
}

/**
 * Delete a cookie from the user's browser.
 */
export function removeCookie(res: NextApiResponse, name: string): void {
  const cookie = serialize(name, "", {
    maxAge: -1,
    path: "/",
  })
  res.setHeader("Set-Cookie", cookie)
}

/**
 * Load a cookie the request.
 * Works with next api routes and getServerSideProps.
 */
export function getCookie(req: NextApiRequest | IncomingMessage, name: string): string | undefined {
  const cookies: Record<string, string> =
    "cookies" in req ? req.cookies : parse(req.headers.cookie ?? "")

  const token = cookies[name]

  return token
}
