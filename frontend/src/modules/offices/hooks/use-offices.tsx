import { useQuery } from '@tanstack/react-query';

import { OfficeSchema } from '@/types';
import { queryKeys } from '@/lib/query-client';
import { ToastService } from '@/lib/toast-service';

const useOffices = () =>
  useQuery<{ data: OfficeSchema[] }>({
    queryKey: [queryKeys.offices],
    queryFn: async () => {
      const response = await fetch('/api/v1/offices');

      if (!response.ok) {
        ToastService.error('Error fetching offices');
      }
      return response.json();
    },
  });

export { useOffices };
