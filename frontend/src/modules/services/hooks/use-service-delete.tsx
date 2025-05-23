import { useMutation } from '@tanstack/react-query';
import { queryClient, queryKeys } from '@/lib/query-client';
import { ToastService } from '@/lib/toast-service';

export const useServiceDelete = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/v1/services/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.services],
        type: 'all',
      });
    },
    onError: () => {
      ToastService.error('Error deleting service');
    },
  });
