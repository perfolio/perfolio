import { request } from '../api';
import {useAuth} from "@perfolio/auth"
import {
  UseMutateAsyncFunction,
  useMutation,
} from 'react-query';



export const useSignout = (): {
  signout: UseMutateAsyncFunction<void, Error>;
} => {
  const {token} = useAuth()
  const mutation = useMutation<void, Error>({
    mutationFn: () =>
      request({
        path: '/api/auth/signup',
        token
      }),
  });

  return { signout: mutation.mutateAsync };
};
