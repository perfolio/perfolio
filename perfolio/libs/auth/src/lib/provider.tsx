import React from 'react';
import useLocalStorageState from "use-local-storage-state";
import { AuthContext } from './context';
/**
 * AuthProvider should be wrapped around your app in /pages/_app.ts.
 *
 * This sets up the fauna context.
 */
export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useLocalStorageState<string>("perfolio_jwt");

  return (
    <AuthContext.Provider value={{ setToken, getToken: () => token  }}>
      {children}
    </AuthContext.Provider>
  );
};
