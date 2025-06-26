import { useMutation } from '@tanstack/react-query';

import { agent } from '@/lib/agent';
import { ToastService } from '@/lib/toast-service';
import { queryClient, queryKeys } from '@/lib/query-client';

export const usePatientDelete = (id: string) =>
  useMutation({
    mutationFn: () => agent.Patients.delete(id),
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: [queryKeys.patients, id],
      });

      queryClient.invalidateQueries({
        queryKey: [queryKeys.patients],
        type: 'all',
      });
    },
    onError: () => {
      ToastService.error('Error deleting patient');
    },
  });
