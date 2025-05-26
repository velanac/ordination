import { useQuery } from '@tanstack/react-query';

import { UserSchema } from '@/types';
import { queryKeys } from '@/lib/query-client';

const useUser = (id: string | undefined) =>
  useQuery<UserSchema>({
    queryKey: [queryKeys.users, id],
    enabled: !!id,
    queryFn: async () => {
      const response = await fetch(`/api/v1/users/${id}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { data } = await response.json();

      return data as UserSchema;
    },
  });

export { useUser };
