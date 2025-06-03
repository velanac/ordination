import { ToastService } from '@/lib/toast-service';
import { useMutation } from '@tanstack/react-query';
import { UserGeneralSettingsSchema } from '@/types';
import { queryClient, queryKeys } from '@/lib/query-client';

export const useUserGeneralSettings = (id: string) =>
  useMutation({
    mutationFn: async (general: UserGeneralSettingsSchema) => {
      const response = await fetch(`/api/v1/users/${id}/general`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(general), // Assuming you want to activate the user
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    },
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
