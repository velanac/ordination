import { useQuery } from '@tanstack/react-query';

import { UserList } from '@/types';
import { queryKeys } from '@/lib/query-client';

const usePatients = () =>
  useQuery<{ data: UserList[] }>({
    queryKey: [queryKeys.users],
    queryFn: async () => {
      const response = await fetch('/api/v1/users');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

export { usePatients };
