import { useMutation } from '@tanstack/react-query';
import { PersonalFormPayload } from '../types';
import { queryClient, queryKeys } from '@/lib/query-client';
import { agent } from '@/lib/agent';

export const usePathPersonal = () =>
  useMutation({
    mutationFn: (data: PersonalFormPayload) => agent.Personal.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.personal],
        type: 'active',
      });
    },
  });
