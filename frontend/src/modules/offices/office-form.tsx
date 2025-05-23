import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { OfficeSchema } from '@/types';
import { Form } from '@/components/ui/form';
import { FormText } from '@/components/controls/form-text';
import { FormActions } from '@/components/controls/form-actions';
import { FormTextArea } from '@/components/controls/form-textarea';

type Props = {
  id?: string;
  disabled?: boolean;
  defaultValues?: OfficeSchema;
  onSubmit: (values: OfficeSchema) => void;
  onCancel?: () => void;
};

function OfficeForm({
  id,
  disabled,
  defaultValues,
  onSubmit,
  onCancel,
}: Props) {
  const { t } = useTranslation('offices');
  const form = useForm<OfficeSchema>({
    defaultValues,
    resolver: zodResolver(OfficeSchema),
  });

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <div className='py-1 px-4 mx-auto w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='w-full md:w-1/6'></div>
          <FormText control={form.control} name='name' label={t('name')} />
          <FormTextArea
            control={form.control}
            name='description'
            label={t('description')}
          />
          <FormActions id={id} disabled={disabled} onCancel={handleCancel} />
        </form>
      </Form>
    </div>
  );
}

export { OfficeForm };
