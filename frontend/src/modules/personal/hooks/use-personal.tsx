import { useQuery } from '@tanstack/react-query';

import { Personal } from '@/types';
import { queryKeys } from '@/lib/query-client';
import { agent } from '@/lib/agent';

const usePersonal = () =>
  useQuery<Personal>({
    queryKey: [queryKeys.personal],
    retry: false,
    queryFn: agent.Personal.get,
  });

export { usePersonal };
