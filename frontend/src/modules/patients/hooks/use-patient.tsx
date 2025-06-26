import { useQuery } from '@tanstack/react-query';

import { PatientSchema } from '@/types';
import { queryKeys } from '@/lib/query-client';
import { agent } from '@/lib/agent';

const usePatient = (id: string | undefined) =>
  useQuery<PatientSchema>({
    queryKey: [queryKeys.patients, id],
    enabled: !!id,
    queryFn: () => agent.Patients.getById(id!),
  });

export { usePatient };
