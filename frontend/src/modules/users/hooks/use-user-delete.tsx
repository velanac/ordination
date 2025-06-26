import { useMutation } from '@tanstack/react-query';

import { agent } from '@/lib/agent';
import { ToastService } from '@/lib/toast-service';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useUserDelete = (id: string) =>
  useMutation({
    mutationFn: () => agent.Users.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.users],
        type: 'all',
      });
      queryClient.removeQueries({
        queryKey: [queryKeys.users, id],
        type: 'all',
      });
      ToastService.success('User deleted successfully');
    },
    onError: () => {
      ToastService.error('Error deleting user');
    },
  });
