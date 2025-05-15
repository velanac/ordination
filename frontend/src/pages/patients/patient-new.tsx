import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

function PatientNew() {
  const form = useForm({
    defaultValues: {
      date: new Date(),
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='date'
        render={({ field }) => (
          <FormItem className='col-span-2'>
            <FormLabel>Name here</FormLabel>
            <FormMessage className='flex justify-start' />
          </FormItem>
        )}
      />
    </Form>
  );
}

export { PatientNew };
