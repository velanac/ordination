import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ServiceSchema } from '@/types';
import { Form } from '@/components/ui/form';
import { FormText } from '@/components/controls/form-text';
import { FormActions } from '@/components/controls/form-actions';

type Props = {
  id?: string;
  defaultValues?: ServiceSchema;
  disabled?: boolean;
  onCancel?: () => void;
  onSubmit: (values: ServiceSchema) => void;
};

function ServiceForm({
  id,
  defaultValues,
  disabled,
  onCancel,
  onSubmit,
}: Props) {
  const { t } = useTranslation('services');
  const form = useForm<ServiceSchema>({
    defaultValues,
    resolver: zodResolver(ServiceSchema),
  });

  const hadleSubmit = (values: ServiceSchema) => {
    onSubmit(values);
  };

  return (
    <div className='py-1 px-4 mx-auto w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(hadleSubmit)} className='space-y-4'>
          <FormText
            control={form.control}
            name='description'
            label={t('description')}
          />
          <FormText control={form.control} name='price' label={t('price')} />
          <FormActions id={id} disabled={disabled} onCancel={onCancel} />
        </form>
      </Form>
    </div>
  );
}

export { ServiceForm };
