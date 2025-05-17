import { useMutation } from '@tanstack/react-query';
import { PatientSchema } from '@/types';
import { queryClient, queryKeys } from '@/lib/query-client';

export const usePatientPost = () =>
  useMutation({
    mutationFn: async (data: PatientSchema) => {
      const response = await fetch('/api/v1/patients', {
        method: 'POST',
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
