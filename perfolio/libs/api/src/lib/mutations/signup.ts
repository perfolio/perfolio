import { request } from '../api';
import {
  UseMutateAsyncFunction,
  useMutation,
} from 'react-query';

export interface Response {
  accessToken: string;
}

export interface Variables {
  email: string;
  name: string;
  password: string;
}

export const useSignup = (): {
  signup: UseMutateAsyncFunction<Response, Error, Variables>;
} => {
  const mutation = useMutation<Response, Error, Variables>({
    mutationFn: (variables) =>
      request({
        path: '/api/auth/signup',
        body: variables,
      }),
  });

  return { signup: mutation.mutateAsync };
};
