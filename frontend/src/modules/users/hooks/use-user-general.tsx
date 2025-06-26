import { useMutation } from '@tanstack/react-query';

import { agent } from '@/lib/agent';
import { ToastService } from '@/lib/toast-service';
import { UserGeneralSettingsSchema } from '@/types';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useUserGeneralSettings = (id: string) =>
  useMutation({
    mutationFn: async (general: UserGeneralSettingsSchema) =>
      agent.Users.updateGeneral(id, general),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.users],
        type: 'all',
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.users, id],
        type: 'all',
      });
      ToastService.success('User general settings updated successfully');
    },
    onError: () => {
      ToastService.error('Error updating user general settings');
    },
  });
