import { useMutation } from '@tanstack/react-query';

import { ServicePayload } from '@/types';
import { queryClient, queryKeys } from '@/lib/query-client';
import { agent } from '@/lib/agent';

export const useServicePost = () =>
  useMutation({
    mutationFn: (data: ServicePayload) => agent.Services.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.services],
        type: 'all',
      });
    },
  });
