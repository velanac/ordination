import { useQuery } from '@tanstack/react-query';

import { OfficeSchema } from '@/types';
import { queryKeys } from '@/lib/query-client';
import { ToastService } from '@/lib/toast-service';

const useOffice = (id: string | undefined) =>
  useQuery<{ data: OfficeSchema }>({
    queryKey: [queryKeys.offices, id],
    enabled: !!id,
    queryFn: async () => {
      const response = await fetch(`/api/v1/offices/${id}`);

      if (!response.ok) {
        ToastService.error('Error fetching office');
      }
      return response.json();
    },
  });

export { useOffice };
