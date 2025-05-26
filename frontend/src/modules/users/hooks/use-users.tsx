import { useQuery } from '@tanstack/react-query';

import { UserList } from '@/types';
import { queryKeys } from '@/lib/query-client';

const useUsers = () =>
  useQuery<UserList[]>({
    queryKey: [queryKeys.users],
    queryFn: async () => {
      const response = await fetch('/api/v1/users');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await response.json();

      return data as UserList[];
    },
  });

export { useUsers };
