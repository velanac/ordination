import { Form } from 'react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DoctorEventPayload } from '@/types/events';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormActions } from '@/components/controls/form-actions';
import { Doctor } from '@/types';

type Props = {
  id?: string;
  disabled?: boolean;
  defaultValues?: DoctorEventPayload;
  onSubmit: (values: DoctorEventPayload) => void;
  onCancel?: () => void;
  doctors: Doctor[];
};

function DoctorEventForm({
  id,
  disabled,
  defaultValues,
  onSubmit,
  onCancel,
  doctors = [],
}: Props) {
  const { t } = useTranslation('events');
  const form = useForm<DoctorEventPayload>({
    defaultValues,
    resolver: zodResolver(DoctorEventPayload),
  });

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <div className='py-1 px-4 mx-auto w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='w-full md:w-1/6'></div>

          {/* <FormText control={form.control} name='name' label={t('name')} />
          <FormTextArea
            control={form.control}
            name='description'
            label={t('description')}
          /> */}
          <FormActions id={id} disabled={disabled} onCancel={handleCancel} />
        </form>
      </Form>
    </div>
  );
}

export { DoctorEventForm };
