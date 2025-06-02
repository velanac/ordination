import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { ChangePasswordSchema } from '@/types';
import { FormText } from '@/components/controls/form-text';
import { FormActions } from '@/components/controls/form-actions';
import { Separator } from '@/components/ui/separator';

function ChangePasswordForm() {
  const { t } = useTranslation('users');
  const disabled = false; // Replace with actual logic to determine if the form should be disabled

  const onSubmit = (data: ChangePasswordSchema) => {
    // Handle password change logic here
    console.log('Password changed:', data);
  };

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  return (
    <div>
      <div className='py-4 mx-auto w-full'>
        <h2 className='text-lg font-semibold'>{t('changePassword')}</h2>
        <p className='text-sm text-gray-500'>
          {t('changePasswordDescription')}
        </p>
      </div>
      <Separator className='my-4' />
      <div className='py-1 mx-auto w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
            <FormActions id='1' disabled={disabled} />
          </form>
        </Form>
      </div>
    </div>
  );
}

export { ChangePasswordForm };
