import { agent } from '@/lib/agent';
import { queryClient, queryKeys } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';

export const usePatientPost = () =>
  useMutation({
    mutationFn: agent.Patients.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.patients],
        type: 'all',
      });
    },
  });
