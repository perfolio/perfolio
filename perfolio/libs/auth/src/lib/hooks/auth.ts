import { AuthContext, IAuthContext } from '../context';
import { useContext, useEffect, useState } from 'react';
import { JWT, payload } from '../jwt';
import { useQueryClient } from 'react-query';
import { z } from 'zod';
import { request } from '@perfolio/api';

export interface UseAuthContext {
  getToken: () => string;
  setToken: (token: string) => void;
}

export interface AuthHook {
  /**
   * Load the previously set token.
   */
  getToken: () => string | undefined;
  /**
   * Set or overwrite the current token.
   */
  setToken: (token: string) => void;
  /**
   * User object. This will be set after the user has been authenticated but loaded
   * asynchronously to improve ux.
   */
  user: z.infer<typeof payload> | undefined;
  isAuthenticated: boolean;
  /**
   * Logs the user in and automatically store the token and load user data in state.
   */
  signin: (email: string, password: string) => Promise<void>;
  /**
   * Creates a new user and calls signin.
   */
  signup: (email: string, username: string, password: string) => Promise<void>;
  /**
   * Delete the refresh token
   */
  signout: () => Promise<void>;
}

async function signup(
  email: string,
  username: string,
  password: string,
  ctx: IAuthContext
): Promise<void> {
  console.log({ username });
  await request({
    token: ctx.getToken(),
    path: '/api/auth/signup',
    body: {
      email,
      username,
      password,
    },
  });
  return signin(email, password, ctx);
}

async function signin(
  email: string,
  password: string,
  ctx: IAuthContext
): Promise<void> {
  const res = await request({
    token: ctx.getToken(),
    path: '/api/auth/signin',
    body: {
      email,
      password,
    },
  });

  const { accessToken } = z.object({ accessToken: z.string() }).parse(res);

  ctx.setToken(accessToken);
}

/**
 * Remove the token from context and clear all required queries
 */
async function signout(ctx: IAuthContext) {
  await request({ token: ctx.getToken(), path: '/api/auth/signout' });
  ctx.setToken(undefined);
}

/**
 * This hook allows you to access the user from anywhere inside the app.
 *
 * You need to set the token once or call signin somewhere..
 */
export function useAuth(): AuthHook {
  const ctx = useContext(AuthContext);
  const token = ctx.getToken();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<z.infer<typeof payload> | undefined>(
    undefined
  );

  useEffect(() => {
    if (token) {
      try {
        const user = JWT.verify(token);
        setUser(user);
        setIsAuthenticated(true);
      } catch {
        setUser(undefined);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  return {
    getToken: ctx.getToken,
    setToken: ctx.setToken,
    user,
    isAuthenticated,
    signin: (username: string, password: string) =>
      signin(username, password, ctx),
    signup: (email: string, username: string, password: string) =>
      signup(email, username, password, ctx),
    signout: () => signout(ctx),
  };
}
