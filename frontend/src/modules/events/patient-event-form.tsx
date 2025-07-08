import { useForm } from 'react-hook-form';

import { PatientListItem } from '@/types';
import { Form } from '@/components/ui/form';
import { PatientFormPayload } from '@/types/events';
import { FormText } from '@/components/controls/form-text';
import { FormCombobox } from '@/components/controls/form-combobox';

type Props = {
  form: ReturnType<typeof useForm<PatientFormPayload>>;
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
        </form>
      </Form>
    </div>
  );
}

export { PatientEventForm };
