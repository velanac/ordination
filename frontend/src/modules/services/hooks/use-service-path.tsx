import { useMutation } from '@tanstack/react-query';
import { ServiceSchema } from '@/types';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useServicePath = () =>
  useMutation({
    mutationFn: async ({ data, id }: { data: ServiceSchema; id: string }) => {
      const response = await fetch(`/api/v1/services/${id}`, {
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
        queryKey: [queryKeys.services],
        type: 'all',
      });
    },
  });
