import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-client';
import { Event } from '@/types/events';

const useEvents = () =>
  useQuery<{ data: Event[] }>({
    queryKey: [queryKeys.events],
    queryFn: async () => {
      const response = await fetch('/api/v1/events');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

export { useEvents };
