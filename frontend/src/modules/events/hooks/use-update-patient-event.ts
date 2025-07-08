import { useMutation } from '@tanstack/react-query';

import { agent } from '@/lib/agent';
import { PatientEventPayload } from '@/types';
import { ToastService } from '@/lib/toast-service';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useUpdatePatientEvent = () =>
  useMutation({
    mutationFn: (data: PatientEventPayload) =>
      agent.Events.updatePatientEvent(data),
    onSuccess: () => {
      ToastService.success('Patient event update successfully');
      queryClient.invalidateQueries({
        queryKey: [queryKeys.events, 'offices'],
        type: 'all',
      });
    },
  });
