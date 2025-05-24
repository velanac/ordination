import { useMutation } from '@tanstack/react-query';

import { ServicePayload } from '@/types';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useServicePost = () =>
  useMutation({
    mutationFn: async (data: ServicePayload) => {
      const response = await fetch('/api/v1/services', {
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
        queryKey: [queryKeys.services],
        type: 'all',
      });
    },
  });
