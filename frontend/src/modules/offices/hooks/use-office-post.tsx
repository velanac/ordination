import { queryClient, queryKeys } from '@/lib/query-client';
import { ToastService } from '@/lib/toast-service';
import { OfficeSchema } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useOfficePost = () =>
  useMutation({
    mutationFn: async (data: OfficeSchema) => {
      const response = await fetch('/api/v1/offices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        ToastService.error('Error creating office');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.offices],
        type: 'all',
      });
    },
  });
