import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PatientSchema } from '@/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Grid3 } from '@/components/layout/girid3';
import { Button } from '@/components/ui/button';
import { Grid4 } from '@/components/layout/grid4';
import { getYear } from 'date-fns';
import { DateFormInput } from '@/components/controls/date-form-input';
import { usePatientPost } from './hooks/use-patient-post';

type Props = {
  patient?: PatientSchema;
};

function PatientForm({ patient }: Props) {
  const create = usePatientPost();
  const form = useForm<PatientSchema>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      fullName: patient?.fullName || '',
      gender: patient?.gender || undefined,
      dateOfBirth: patient?.dateOfBirth || new Date(),
      phone: patient?.phone || '',
      address: patient?.address || '',
      city: patient?.city || '',
      country: patient?.country || '',
    },
  });

  const onSubmit = (data: PatientSchema) => {
    console.log('Form data:', data);
    if (patient) {
      console.log('Updating patient:', patient.id);
    } else {
      create.mutate(data, {
        onSuccess: () => {
          form.reset();
        },
        onError: (error) => {
          console.error('Error creating patient:', error);
        },
      });
    }
  };

  return (
    <div className='py-1 px-4 mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='w-full md:w-1/6'></div>
          <Grid3>
            <div className='col-span-2'>
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Full Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DateFormInput
              name='dateOfBirth'
              label='Date of Birth'
              control={form.control}
              startYear={1900}
              endYear={getYear(new Date())}
            />
          </Grid3>
          <Grid3>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email' {...field} type='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input placeholder='Gender' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder='Phone' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Grid3>
          <Grid4>
            <div className='col-span-2'>
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder='Address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-'>
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder='City' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-1/2'>
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder='Country' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
