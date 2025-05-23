import { useQuery } from '@tanstack/react-query';

import { ServiceSchema } from '@/types';
import { queryKeys } from '@/lib/query-client';

const useServices = () =>
  useQuery<{ data: ServiceSchema[] }>({
    queryKey: [queryKeys.services],
    queryFn: async () => {
      const response = await fetch('/api/v1/services');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    },
  });

export { useServices };
