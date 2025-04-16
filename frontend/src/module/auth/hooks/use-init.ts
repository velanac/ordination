import { queryKeys } from '@/lib/query-client';
import { fetchResource } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

const useInit = () =>
  useQuery<{ data: { isOpen: boolean } }>({
    queryKey: [queryKeys.init],
    queryFn: async () => {
      const response = await fetchResource('/api/v1/init');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

export default useInit;
