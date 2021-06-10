import { serialize } from 'cookie';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

const TOKEN_NAME = 'perfolio_refresh_token';
const MAX_AGE = 60 * 60 * 8; // 8 hours

/**
 * Save a cookie to the user's browser.
 */
export function setRefreshCookie(res: NextApiResponse, token: string): void {
  const cookie = serialize(TOKEN_NAME, token, {
    /**
     * HTTP-ONLY cookies can only be read server side.
     */
    httpOnly: true,
    maxAge: MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  res.setHeader('Set-Cookie', cookie);
}

/**
 * Delete a cookie from the user's browser.
 */
export function removeAuthCookie(res: NextApiResponse): void {
  const cookie = serialize(TOKEN_NAME, '', {
    httpOnly: true,
    maxAge: -1,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  res.setHeader('Set-Cookie', cookie);
}

export const ERR_TOKEN_NOT_FOUND = new Error(
  'No token is found in your cookies'
);

/**
 * Overload for getServersideProps.
 */
export function getTokenFromCookies(ctx: GetServerSidePropsContext): string;
/**
 * Overload for api routes.
 */
export function getTokenFromCookies(req: NextApiRequest): string;
/**
 * Load a fauna token from cookies.
 * Works with next api routes and getServerSideProps.
 *
 * @throws ERR_TOKEN_NOT_FOUND.
 */
export function getTokenFromCookies(
  arg0: GetServerSidePropsContext | NextApiRequest
): string {
  const cookies: Record<string, string> =
    'cookies' in arg0
      ? (arg0 as NextApiRequest).cookies
      : (arg0 as GetServerSidePropsContext).req.cookies;

  const token = cookies[TOKEN_NAME];

  return token;
}
