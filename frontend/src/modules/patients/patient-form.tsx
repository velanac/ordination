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
import { ToastService } from '@/lib/toast-service';
import { useSetAtom } from 'jotai';
import { patientModal } from '@/store/patients';
import { usePatientPath } from './hooks/use-patient-path';

type Props = {
  patient: PatientSchema | null;
};

function PatientForm({ patient }: Props) {
  const setPatientModal = useSetAtom(patientModal);
  const create = usePatientPost();
  const update = usePatientPath();
  const form = useForm<PatientSchema>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      firstName: patient?.firstName || '',
      parentName: patient?.parentName || '',
      lastName: patient?.lastName || '',
      gender: patient?.gender || undefined,
      dateOfBirth: patient?.dateOfBirth || new Date(),
      email: patient?.email || '',
      phone: patient?.phone || '',
      address: patient?.address || '',
      city: patient?.city || '',
      country: patient?.country || '',
    },
  });

  const onSubmit = (data: PatientSchema) => {
    console.log('Form data:', data);
    if (patient) {
      update.mutate(
        { data, id: patient.id! },
        {
          onSuccess: () => {
            ToastService.success('Patient updated successfully');
            setPatientModal({
              isOpen: false,
              patient: null,
            });
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
          setPatientModal({
            isOpen: false,
            patient: null,
          });
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
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder='First Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='parentName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Parent Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Last Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
          </Grid4>
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
