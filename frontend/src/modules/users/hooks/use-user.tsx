import { useQuery } from '@tanstack/react-query';

import { UserResponse } from '@/types';
import { queryKeys } from '@/lib/query-client';
import { agent } from '@/lib/agent';

const useUser = (id: string | undefined) =>
  useQuery<UserResponse>({
    queryKey: [queryKeys.users, id],
    enabled: !!id,
    queryFn: () => agent.Users.getById(id!),
  });

export { useUser };
