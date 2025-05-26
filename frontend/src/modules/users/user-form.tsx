import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { UserList, UserSchema } from '@/types';
import { Form } from '@/components/ui/form';
import { Grid4 } from '@/components/layout/grid4';
import { FormText } from '@/components/controls/form-text';
import { FormSelect } from '@/components/controls/form-select';
import { FormActions } from '@/components/controls/form-actions';

type Props = {
  id?: string;
  disabled?: boolean;
  defaultValues?: UserList;
  onSubmit: (values: UserSchema) => void;
  onCancel?: () => void;
};

function UserForm({ id, disabled, defaultValues, onSubmit, onCancel }: Props) {
  const { t } = useTranslation('users');
  const roles = useMemo(
    () => [
      { value: 'SuperAdmin', label: t('superadmin') },
      { value: 'Admin', label: t('admin') },
      { value: 'Doctor', label: t('doctor') },
    ],
    [t]
  );

  const form = useForm<UserSchema>({
    defaultValues: { ...defaultValues, role: 'Doctor' },
    resolver: zodResolver(UserSchema),
  });

  return (
    <div className='py-1 px-4 mx-auto w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <Grid4>
            <FormText
              control={form.control}
              name='username'
              label={t('username')}
            />
            <FormText
              control={form.control}
              name='password'
              label={t('password')}
            />
            <FormText
              control={form.control}
              name='confirmPassword'
              label={t('confirmPassword')}
            />
            <FormSelect
              name='role'
              label={t('role')}
              items={roles}
              control={form.control}
            />
          </Grid4>

          <FormActions id={id} disabled={disabled} onCancel={onCancel} />
        </form>
      </Form>
    </div>
  );
}

export { UserForm };
