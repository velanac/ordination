import { ToastService } from '@/lib/toast-service';
import { useMutation } from '@tanstack/react-query';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useUserDelete = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/v1/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.users],
        type: 'all',
      });
      ToastService.success('User deleted successfully');
    },
    onError: () => {
      ToastService.error('Error deleting user');
    },
  });
