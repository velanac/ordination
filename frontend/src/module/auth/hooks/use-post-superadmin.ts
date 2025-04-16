import { queryClient, queryKeys } from '@/lib/query-client';
import { SuperUserFormPayload } from '@/module/auth/types';

export const usePostSuperAdmin = () => {
  const postAdmin = async (palyoad: SuperUserFormPayload) => {
    try {
      const res = await fetch('/api/v1/opensuperadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: palyoad.email,
          fullName: palyoad.fullName,
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
        alert('Super admin created successfully');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return postAdmin;
};
