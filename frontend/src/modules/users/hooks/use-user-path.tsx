import { useMutation } from '@tanstack/react-query';
import { PatientSchema } from '@/types';
import { queryClient, queryKeys } from '@/lib/query-client';

export const usePatientPath = () =>
  useMutation({
    mutationFn: async ({ data, id }: { data: PatientSchema; id: string }) => {
      const response = await fetch(`/api/v1/patients/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.patients],
        type: 'all',
      });
    },
  });
