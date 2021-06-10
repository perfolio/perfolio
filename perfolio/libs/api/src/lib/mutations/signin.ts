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
  password: string;
}

export const useSignin = (): {
  signin: UseMutateAsyncFunction<Response, Error, Variables>;
} => {
  const mutation = useMutation<Response, Error, Variables>({
    mutationFn: (variables) =>
      request({
        path: '/api/auth/signin',
        body: variables,
      }),
  });

  return { signin: mutation.mutateAsync };
};
