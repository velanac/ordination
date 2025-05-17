import { useQuery } from '@tanstack/react-query';

import { PatientSchema } from '@/types';
import { queryKeys } from '@/lib/query-client';

const usePatient = (id: string | undefined) =>
  useQuery<{ data: PatientSchema }>({
    queryKey: [queryKeys.patients, id],
    enabled: !!id,
    queryFn: async () => {
      const response = await fetch(`/api/v1/patients/${id}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

export { usePatient };
