import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  PersonalFormPayload,
  PersonalFormSchema,
} from '@/module/personal/types';
import { Personal } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { usePathPersonal } from './hooks/use-path-personal.';
import { usePostPersonal } from './hooks/use-post-personal';
import { Grid2 } from '@/components/layout/girid2';
import { Grid3 } from '@/components/layout/girid3';

interface PersonalFormProps {
  personal?: Personal | null;
}

const PersonalForm = ({ personal }: PersonalFormProps) => {
  const navigate = useNavigate();
  const create = usePostPersonal();
  const path = usePathPersonal();

  const form = useForm<PersonalFormPayload>({
    resolver: zodResolver(PersonalFormSchema),
    defaultValues: {
      titles: personal?.titles || '',
      firstName: personal?.firstName || '',
      lastName: personal?.lastName || '',
      phone: personal?.phone || '',
      address: personal?.address || '',
      city: personal?.city || '',
      state: personal?.state || '',
      country: personal?.country || '',
      postalCode: personal?.postalCode || '',
    },
  });

  const onSubmit = (data: PersonalFormPayload) => {
    if (personal) {
      path.mutate(data);
    } else {
      create.mutate(data);
    }
  };

  return (
    <div className='p-4 mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='w-full md:w-1/6'>
            <FormField
              control={form.control}
              name='titles'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titles</FormLabel>
                  <FormControl>
                    <Input placeholder='Titles' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Grid2>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder='First Name' {...field} />
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
                    <Input placeholder='Last name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Grid2>
          <Grid3>
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
          </Grid3>
          <Grid3>
            <FormField
              control={form.control}
              name='state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder='State' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name='postalCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder='Postal Code' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Grid3>
          <div className='flex w-full items-center justify-end space-x-4'>
            <Button type='button' onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export { PersonalForm };
