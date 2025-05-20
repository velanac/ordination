import { useQuery } from '@tanstack/react-query';

import { PatientListItem } from '@/types';
import { queryKeys } from '@/lib/query-client';

const usePatients = () =>
  useQuery<{ data: PatientListItem[] }>({
    queryKey: [queryKeys.patients],
    queryFn: async () => {
      const response = await fetch('/api/v1/patients');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

export { usePatients };
