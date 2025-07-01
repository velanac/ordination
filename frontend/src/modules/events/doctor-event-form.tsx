import { useForm } from 'react-hook-form';

import { Doctor } from '@/types';
import { Form } from '@/components/ui/form';
import { DoctorEventPayload } from '@/types/events';
import { FormCombobox } from '@/components/controls/form-combobox';
import { TimeFormInput } from '@/components/controls/time-form-input';
import { FormText } from '@/components/controls/form-text';

type Props = {
  form: ReturnType<typeof useForm<DoctorEventPayload>>;
  doctors: Doctor[];
};

function DoctorEventForm({ form, doctors = [] }: Props) {
  return (
    <div className='py-1 px-1 mx-auto w-full'>
      <Form {...form}>
        <form className='space-y-4'>
          <FormText hidden={true} control={form.control} name='id' label='' />
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
          <TimeFormInput
            name='startTime'
            label='Start Time'
            control={form.control}
          />
          <TimeFormInput
            name='endTime'
            label='End Time'
            control={form.control}
          />
        </form>
      </Form>
    </div>
  );
}

export { DoctorEventForm };
