import { useQuery } from '@tanstack/react-query';

import { Doctor } from '@/types';
import { queryKeys } from '@/lib/query-client';
import { Requests } from '@/lib/agent';

const useDoctors = () =>
  useQuery<Doctor[]>({
    queryKey: [queryKeys.doctors],
    retry: false,
    queryFn: () => Requests.get<Doctor[]>('/doctors'),
  });

export { useDoctors };
