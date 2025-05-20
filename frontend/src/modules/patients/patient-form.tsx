import { getYear } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PatientSchema } from '@/types';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Grid4 } from '@/components/layout/grid4';
import { Grid3 } from '@/components/layout/girid3';
import { ToastService } from '@/lib/toast-service';
import { usePatientPost } from './hooks/use-patient-post';
import { usePatientPath } from './hooks/use-patient-path';
import { FormText } from '@/components/controls/form-text';
import { FormSelect } from '@/components/controls/form-select';
import { DateFormInput } from '@/components/controls/date-form-input';

type Props = {
  patient?: PatientSchema | null;
  onSaveSuccess: () => void;
};

function PatientForm({ patient, onSaveSuccess }: Props) {
  const create = usePatientPost();
  const update = usePatientPath();
  const form = useForm<PatientSchema>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      firstName: patient?.firstName || '',
      parentName: patient?.parentName || '',
      lastName: patient?.lastName || '',
      gender: patient?.gender || undefined,
      dateOfBirth: patient?.dateOfBirth
        ? new Date(patient.dateOfBirth)
        : new Date(),
      email: patient?.email || '',
      phone: patient?.phone || '',
      address: patient?.address || '',
      city: patient?.city || '',
      country: patient?.country || '',
    },
  });

  const genderOptions = [
    { value: 'famale', label: 'Famale' },
    { value: 'male', label: 'Male' },
  ];

  const onSubmit = (data: PatientSchema) => {
    console.log('Form data:', data);
    if (patient) {
      update.mutate(
        { data, id: patient.id! },
        {
          onSuccess: () => {
            ToastService.success('Patient updated successfully');
            onSaveSuccess();
          },
          onError: (err) => {
            ToastService.error(`Something went wrong: ${err?.message}`);
          },
        }
      );
    } else {
      create.mutate(data, {
        onSuccess: () => {
          ToastService.success('Patient created successfully');
          onSaveSuccess();
        },
        onError: (err) => {
          ToastService.error(`Something went wrong: ${err?.message}`);
        },
      });
    }
  };

  return (
    <div className='py-1 px-4 mx-auto w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='w-full md:w-1/6'></div>
          <Grid3>
            <FormText
              control={form.control}
              name='firstName'
              label='First Name'
            />
            <FormText
              control={form.control}
              name='parentName'
              label='Parent Name'
            />
            <FormText
              control={form.control}
              name='lastName'
              label='Last Name'
            />
          </Grid3>
          <Grid4>
            <DateFormInput
              name='dateOfBirth'
              label='Date of Birth'
              control={form.control}
              startYear={1900}
              endYear={getYear(new Date())}
            />
            <FormText control={form.control} name='email' label='Email' />
            <FormSelect
              name='gender'
              label='Gender'
              items={genderOptions}
              control={form.control}
            />
            <FormText control={form.control} name='phone' label='Phone' />
          </Grid4>
          <Grid4>
            <div className='col-span-2'>
              <FormText control={form.control} name='address' label='Address' />
            </div>
            <div className='col-span-'>
              <FormText control={form.control} name='city' label='City' />
            </div>
            <div className='col-span-1/2'>
              <FormText control={form.control} name='country' label='Country' />
            </div>
          </Grid4>

          <div className='flex w-full items-center justify-end space-x-4'>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export { PatientForm };
