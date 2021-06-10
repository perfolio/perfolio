import { useAuth, withAuthentication } from '@perfolio/auth';
import { NextPage } from 'next';
import React from 'react';

export const App: NextPage = () => {
  const { user, getToken, isAuthenticated } = useAuth();
  console.log(getToken(), isAuthenticated);
  return <div>{JSON.stringify(user)}</div>;
};

export default withAuthentication(App);
