import { queryKeys } from '@/lib/query-client';
import { useQuery } from '@tanstack/react-query';

export const usePersonal = () =>
  useQuery({
    queryKey: [queryKeys.personal],
    queryFn: async () => {
      const response = await fetch('/api/users/personal');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
