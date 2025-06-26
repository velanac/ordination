import { useMutation } from '@tanstack/react-query';

import { agent } from '@/lib/agent';
import { UserPayload } from '@/types';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useUserPath = () =>
  useMutation({
    mutationFn: ({ data, id }: { data: UserPayload; id: string }) =>
      agent.Users.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.users],
        type: 'all',
      });
    },
  });
