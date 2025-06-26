import { useQuery } from '@tanstack/react-query';

import { ServiceSchema } from '@/types';
import { queryKeys } from '@/lib/query-client';
import { convertAmountFromMiliunits } from '@/lib/utils';
import { agent } from '@/lib/agent';

const useServices = () =>
  useQuery<ServiceSchema[]>({
    queryKey: [queryKeys.services],
    queryFn: () =>
      agent.Services.getAll().then((services) =>
        services.map((service) => ({
          ...service,
          price: convertAmountFromMiliunits(service.price).toString(),
        }))
      ),
  });

export { useServices };
