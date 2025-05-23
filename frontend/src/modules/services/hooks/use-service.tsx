import { useQuery } from '@tanstack/react-query';

import { ServiceSchema } from '@/types';
import { queryKeys } from '@/lib/query-client';

const useService = (id: string | undefined) =>
  useQuery<{ data: ServiceSchema }>({
    queryKey: [queryKeys.services, id],
    enabled: !!id,
    queryFn: async () => {
      const response = await fetch(`/api/v1/service/${id}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

export { useService };
