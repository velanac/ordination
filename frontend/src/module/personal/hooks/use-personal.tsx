import { useQuery } from '@tanstack/react-query';

import { Personal } from '@/types';
import { queryKeys } from '@/lib/query-client';

const usePersonal = () =>
  useQuery<{ data: Personal }>({
    queryKey: [queryKeys.personal],
    retry: false,
    queryFn: async () => {
      const response = await fetch('/api/v1/personal');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

export { usePersonal };
