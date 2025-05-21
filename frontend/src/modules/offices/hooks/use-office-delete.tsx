import { useMutation } from '@tanstack/react-query';
import { queryClient, queryKeys } from '@/lib/query-client';
import { ToastService } from '@/lib/toast-service';

export const useOfficeDelete = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/v1/offices/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        ToastService.error('Error deleting office');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.offices],
        type: 'all',
      });
    },
    onError: () => {
      ToastService.error('Error deleting office');
    },
  });
