import { Requests } from '@/lib/agent';
import { queryKeys } from '@/lib/query-client';
import { useQuery } from '@tanstack/react-query';

const useInit = () =>
  useQuery<{ data: { isOpen: boolean } }>({
    queryKey: [queryKeys.init],
    queryFn: () => Requests.get<{ data: { isOpen: boolean } }>('/auth/isopen'),
  });

export default useInit;
