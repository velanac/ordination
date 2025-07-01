import { useMutation } from '@tanstack/react-query';

import { agent } from '@/lib/agent';
import { DoctorEventPayload } from '@/types';
import { ToastService } from '@/lib/toast-service';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useUpdateDoctorEvent = () =>
  useMutation({
    mutationFn: (data: DoctorEventPayload) =>
      agent.Events.updateDoctorEvent(data),
    onSuccess: () => {
      ToastService.success('Doctor event update successfully');
      queryClient.invalidateQueries({
        queryKey: [queryKeys.events, 'offices'],
        type: 'all',
      });
    },
  });
