import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DoctorEventPayload } from '@/types/events';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormActions } from '@/components/controls/form-actions';
import { Doctor } from '@/types';
import { FormCombobox } from '@/components/controls/form-combobox';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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
    <div className='py-1 px-1 mx-auto w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormCombobox
            control={form.control}
            items={[
              ...doctors.map((d) => ({
                value: d.id,
                label: d.description,
              })),
            ]}
            label='Doctor'
            name='userId'
            onSelect={(value) => {
              form.setValue('userId', value!);
            }}
          />
          <Input
            type='time'
            id='time'
            step='1'
            defaultValue='10:30:00'
            className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
          />
          {/* <FormText control={form.control} name='name' label={t('name')} />
          <FormTextArea
            control={form.control}
            name='description'
            label={t('description')}
          /> */}
          {/* <FormActions id={id} disabled={disabled} onCancel={handleCancel} /> */}
        </form>
      </Form>
    </div>
  );
}

export { DoctorEventForm };
