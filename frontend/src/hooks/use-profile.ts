import { useQuery } from '@tanstack/react-query';

import { Profile } from '@/types';
import { queryKeys } from '@/lib/query-client';

const useProfile = () =>
  useQuery<{ data: Profile }>({
    queryKey: [queryKeys.profile],
    retry: false,
    queryFn: async () => {
      const response = await fetch('/api/v1/auth/profile');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

export { useProfile };
