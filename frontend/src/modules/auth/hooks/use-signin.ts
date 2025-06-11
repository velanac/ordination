import { ToastService } from '@/lib/toast-service';
import { SignInFormPayload } from '@/modules/auth/types';
import { queryClient, queryKeys } from '@/lib/query-client';
import { Requests } from '@/lib/agent';

export const useSignIn = () => {
  const signin = async (palyoad: SignInFormPayload) => {
    await Requests.post<void>('/auth/signin', {
      email: palyoad.email,
      password: palyoad.password,
    });

    ToastService.success('Sign in successfully!');
    queryClient.invalidateQueries({
      queryKey: [queryKeys.profile],
      type: 'all',
    });
  };

  return signin;
};
