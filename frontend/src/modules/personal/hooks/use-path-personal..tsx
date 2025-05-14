import { useMutation } from '@tanstack/react-query';
import { PersonalFormPayload } from '../types';
import { queryClient, queryKeys } from '@/lib/query-client';

export const usePathPersonal = () =>
  useMutation({
    mutationFn: async (data: PersonalFormPayload) => {
      const response = await fetch('/api/v1/personal', {
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
        queryKey: [queryKeys.personal],
        type: 'active',
      });
    },
  });
