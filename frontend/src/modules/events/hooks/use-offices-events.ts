import { useQuery } from '@tanstack/react-query';

import { agent } from '@/lib/agent';
import { queryKeys } from '@/lib/query-client';
import { OfficeWithEvents } from '@/types/events';

const useOfficesEvents = () =>
  useQuery<OfficeWithEvents[]>({
    queryKey: [queryKeys.events, 'offices'],
    queryFn: async () => agent.Events.getOfficesEvents(),
  });

export { useOfficesEvents };
