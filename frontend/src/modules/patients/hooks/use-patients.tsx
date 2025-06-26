import { useQuery } from '@tanstack/react-query';

import { PatientListItem } from '@/types';
import { queryKeys } from '@/lib/query-client';
import { agent } from '@/lib/agent';

const usePatients = () =>
  useQuery<PatientListItem[]>({
    queryKey: [queryKeys.patients],
    queryFn: () => agent.Patients.getAll(),
  });

export { usePatients };
