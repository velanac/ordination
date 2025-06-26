import { agent } from '@/lib/agent';
import { useMutation } from '@tanstack/react-query';
import { queryClient, queryKeys } from '@/lib/query-client';
import { PatientSchema } from '@/types';

export const usePatientPath = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: PatientSchema }) =>
      agent.Patients.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.patients],
        type: 'all',
      });
    },
  });
