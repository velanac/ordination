import { useQuery } from '@tanstack/react-query';

import { ServicePayload } from '@/types';
import { queryKeys } from '@/lib/query-client';
import { agent } from '@/lib/agent';

const useService = (id: string | undefined) =>
  useQuery<ServicePayload>({
    queryKey: [queryKeys.services, id],
    enabled: !!id,
    queryFn: () => agent.Services.getById(id!),
  });

export { useService };
