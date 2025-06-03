import { ToastService } from '@/lib/toast-service';
import { useMutation } from '@tanstack/react-query';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useUserIsActive = (id: string) =>
  useMutation({
    mutationFn: async (active: boolean) => {
      const response = await fetch(`/api/v1/users/${id}/active`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active }), // Assuming you want to activate the user
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
      queryClient.invalidateQueries({
        queryKey: [queryKeys.users, id],
        type: 'all',
      });
      ToastService.success('User status updated successfully');
    },
    onError: () => {
      ToastService.error('Error updating user status');
    },
  });
