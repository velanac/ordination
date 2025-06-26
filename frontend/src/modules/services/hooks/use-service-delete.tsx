import { useMutation } from '@tanstack/react-query';
import { queryClient, queryKeys } from '@/lib/query-client';
import { ToastService } from '@/lib/toast-service';
import { agent } from '@/lib/agent';

export const useServiceDelete = (id: string) =>
  useMutation({
    mutationFn: () => agent.Services.delete(id),
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: [queryKeys.services, id!],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.services],
        type: 'all',
      });
    },
    onError: () => {
      ToastService.error('Error deleting service');
    },
  });
