import { useQuery } from '@tanstack/react-query';

import { UserList } from '@/types';
import { agent } from '@/lib/agent';
import { queryKeys } from '@/lib/query-client';

const useUsers = () =>
  useQuery<UserList[]>({
    queryKey: [queryKeys.users],
    queryFn: agent.Users.getAll,
  });

export { useUsers };
