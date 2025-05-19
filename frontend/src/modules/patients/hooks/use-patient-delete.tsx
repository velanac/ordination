import { useMutation } from '@tanstack/react-query';
import { queryClient, queryKeys } from '@/lib/query-client';
import { ToastService } from '@/lib/toast-service';

export const usePatientDelete = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/v1/patients/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.patients],
        type: 'all',
      });
    },
    onError: () => {
      ToastService.error('Error deleting patient');
    },
  });
