import { ServicePayload } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { queryClient, queryKeys } from '@/lib/query-client';
import { agent } from '@/lib/agent';

export const useServicePath = () =>
  useMutation({
    mutationFn: ({ data, id }: { data: ServicePayload; id: string }) =>
      agent.Services.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.services],
        type: 'all',
      });
    },
  });
