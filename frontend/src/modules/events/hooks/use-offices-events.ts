import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-client';
import { OfficeWithEvents } from '@/types/events';

const useOfficesEvents = () =>
  useQuery<{ data: OfficeWithEvents[] }>({
    queryKey: [queryKeys.events, 'offices'],
    queryFn: async () => {
      const response = await fetch('/api/v1/offices-events');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

export { useOfficesEvents };
