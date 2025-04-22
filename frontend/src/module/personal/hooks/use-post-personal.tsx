import { useMutation } from '@tanstack/react-query';
import { PersonalFormPayload } from '../types';
import { queryClient, queryKeys } from '@/lib/query-client';

export const usePostPersonal = () =>
  useMutation({
    mutationFn: async (data: PersonalFormPayload) => {
      const response = await fetch('/api/users/personal', {
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
        queryKey: [queryKeys.personal],
        type: 'active',
      });
    },
  });
