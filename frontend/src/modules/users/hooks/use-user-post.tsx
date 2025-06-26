import { UserPayload } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { queryClient, queryKeys } from '@/lib/query-client';
import { agent } from '@/lib/agent';

export const useUserPost = () =>
  useMutation({
    mutationFn: (data: UserPayload) => agent.Users.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.users],
        type: 'all',
      });
    },
  });
