import { useQuery } from '@tanstack/react-query';

import { ServiceSchema, ServiceResponse } from '@/types';
import { queryKeys } from '@/lib/query-client';
import { convertAmountFromMiliunits } from '@/lib/utils';

const useServices = () =>
  useQuery<ServiceSchema[]>({
    queryKey: [queryKeys.services],
    queryFn: async () => {
      const response = await fetch('/api/v1/services');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await response.json();

      return data.map((service: ServiceResponse) => ({
        ...service,
        price: convertAmountFromMiliunits(service.price), // Convert from miliunits to units
      }));
    },
  });

export { useServices };
