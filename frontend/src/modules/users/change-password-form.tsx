import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { ChangePasswordSchema } from '@/types';
import { FormText } from '@/components/controls/form-text';
import { FormActions } from '@/components/controls/form-actions';
import { Separator } from '@/components/ui/separator';

type Props = {
  disabled?: boolean;
  onSubmit: (values: ChangePasswordSchema) => void;
  onCancel?: () => void;
};

function ChangePasswordForm({ disabled, onSubmit, onCancel }: Props) {
  const { t } = useTranslation('users');

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  return (
    <div>
      <div className='py-1 px-4 mx-auto w-full'>
        <h2 className='text-lg font-semibold'>{t('changePassword')}</h2>
        <p className='text-sm text-gray-500'>
          {t('changePasswordDescription')}
        </p>
      </div>
      <Separator className='my-4' />
      <div className='py-1 px-4 mx-auto w-full'>
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
            <FormActions id='1' disabled={disabled} onCancel={onCancel} />
          </form>
        </Form>
      </div>
    </div>
  );
}

export { ChangePasswordForm };
