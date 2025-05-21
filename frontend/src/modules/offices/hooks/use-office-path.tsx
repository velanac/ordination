import { OfficeSchema } from '@/types';
import { queryClient, queryKeys } from '@/lib/query-client';

import { useMutation } from '@tanstack/react-query';
import { ToastService } from '@/lib/toast-service';

export const useOfficePath = () =>
  useMutation({
    mutationFn: async ({ data, id }: { data: OfficeSchema; id: string }) => {
      const response = await fetch(`/api/v1/offices/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        ToastService.error('Error updating office');
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
