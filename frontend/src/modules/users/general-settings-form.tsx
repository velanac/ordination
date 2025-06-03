import { useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { UserGeneralSettingsSchema } from '@/types';
import { Separator } from '@/components/ui/separator';
import { FormSelect } from '@/components/controls/form-select';
import { useUserGeneralSettings } from './hooks/use-user-general';
import { useNavigate, useParams } from 'react-router';

type Props = {
  active: boolean;
  role?: 'SuperAdmin' | 'Admin' | 'Doctor';
};

function GeneraSettingsForm({ active, role }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation('users');
  const updateGeneral = useUserGeneralSettings(id!);
  const { t: contorlsT } = useTranslation('controls');
  const roles = useMemo(
    () => [
      { value: 'SuperAdmin', label: t('superadmin') },
      { value: 'Admin', label: t('admin') },
      { value: 'Doctor', label: t('doctor') },
    ],
    [t]
  );

  const onSubmit = (data: UserGeneralSettingsSchema) => {
    updateGeneral.mutate(data, {
      onSuccess: () => {
        navigate(-1);
      },
      onError: (error) => {
        // Optionally handle error, e.g., show a toast notification
        console.error('Error updating user general settings:', error);
      },
    });
  };

  const form = useForm<UserGeneralSettingsSchema>({
    resolver: zodResolver(UserGeneralSettingsSchema),
    defaultValues: {
      active: active,
      role: role || 'Doctor',
    },
  });

  return (
    <div>
      <div className='py-4 mx-auto w-full'>
        <h2 className='text-lg font-semibold'>{t('generalForm')}</h2>
        <p className='text-sm text-gray-500'>{t('generalFormDescription')}</p>
      </div>
      <Separator className='my-4' />
      <div className=' mx-auto w-full'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6'
          >
            <div>
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='active'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                      <div className='space-y-0.5'>
                        <FormLabel>{t('changeActiveStatus')}</FormLabel>
                        <FormDescription>
                          {t('changeActiveStatusDescription')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormSelect
                  name='role'
                  label={t('role')}
                  items={roles}
                  control={form.control}
                />
              </div>
            </div>
            <div className='flex justify-end'>
              <Button type='submit'>{contorlsT('saveChanges')}</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export { GeneraSettingsForm };
