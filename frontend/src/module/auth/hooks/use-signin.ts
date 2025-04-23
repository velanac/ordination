import { ToastService } from '@/lib/toast-service';
import { SignInFormPayload } from '@/module/auth/types';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useSignIn = () => {
  const signin = async (palyoad: SignInFormPayload) => {
    try {
      const res = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: palyoad.email,
          password: palyoad.password,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      } else {
        ToastService.success('Sign in successfully!');
        queryClient.invalidateQueries({
          queryKey: [queryKeys.profile],
          type: 'all',
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        ToastService.error(error.message);
      }
    }
  };

  return signin;
};
