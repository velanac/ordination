import { useMutation } from '@tanstack/react-query';

import { agent } from '@/lib/agent';
import { PatientEventPayload } from '@/types';
import { ToastService } from '@/lib/toast-service';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useCreatePatientEvent = () =>
  useMutation({
    mutationFn: (data: PatientEventPayload) =>
      agent.Events.createPatientEvent(data),
    onSuccess: () => {
      ToastService.success('Doctor event created successfully');
      queryClient.invalidateQueries({
        queryKey: [queryKeys.events, 'offices'],
        type: 'all',
      });
    },
  });
