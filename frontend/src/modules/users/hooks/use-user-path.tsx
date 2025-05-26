import { useMutation } from '@tanstack/react-query';
import { UserPayload } from '@/types';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useUserPath = () =>
  useMutation({
    mutationFn: async ({ data, id }: { data: UserPayload; id: string }) => {
      const response = await fetch(`/api/v1/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.users],
        type: 'all',
      });
    },
  });
