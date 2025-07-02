import { useForm } from 'react-hook-form';

import { FormCombobox } from '@/components/controls/form-combobox';
import { FormText } from '@/components/controls/form-text';
import { TimeFormInput } from '@/components/controls/time-form-input';
import { Form } from '@/components/ui/form';
import { PatientListItem } from '@/types';
import { PatientEventPayload } from '@/types/events';

type Props = {
  form: ReturnType<typeof useForm<PatientEventPayload>>;
  patients: PatientListItem[];
};

function PatientEventForm({ form, patients = [] }: Props) {
  return (
    <div className='py-1 px-1 mx-auto w-full'>
      <Form {...form}>
        <form className='space-y-4'>
          <FormText hidden={true} control={form.control} name='id' label='' />
          <FormCombobox
            control={form.control}
            items={[
              ...patients.map((d) => ({
                value: d.id,
                label: d.fullName,
              })),
            ]}
            label='Patient'
            name='patientId'
            onSelect={(value) => {
              form.setValue('patientId', value!);
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

export { PatientEventForm };
