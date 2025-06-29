import { Requests } from '@/lib/agent';
import { queryKeys } from '@/lib/query-client';
import { useQuery } from '@tanstack/react-query';

const useInit = () =>
  useQuery<{ isOpen: boolean }>({
    queryKey: [queryKeys.init],
    queryFn: () => Requests.get<{ isOpen: boolean }>('/auth/isopen'),
  });

export default useInit;
