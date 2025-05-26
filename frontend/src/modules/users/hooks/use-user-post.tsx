import { UserPayload } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useUserPost = () =>
  useMutation({
    mutationFn: async (data: UserPayload) => {
      const response = await fetch('/api/v1/users', {
        method: 'POST',
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
