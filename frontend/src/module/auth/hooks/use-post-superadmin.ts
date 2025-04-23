import { queryClient, queryKeys } from '@/lib/query-client';
import { ToastService } from '@/lib/toast-service';
import { SuperUserFormPayload } from '@/module/auth/types';

export const usePostSuperAdmin = () => {
  const postAdmin = async (palyoad: SuperUserFormPayload) => {
    try {
      const res = await fetch('/api/v1/auth/opensuperadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: palyoad.email,
          password: palyoad.password,
        }),
      });

      if (!res.ok && res.status !== 204) {
        const err = await res.json();
        throw new Error(err.message);
      } else {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.init],
          type: 'all',
        });
        ToastService.success('Super admin created successfully!');
      }
    } catch (error) {
      if (error instanceof Error) {
        ToastService.error(error.message);
      }
    }
  };

  return postAdmin;
};
