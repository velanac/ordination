import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { usePostSuperAdmin } from './hooks/use-post-superadmin';
import { SuperUserFormPayload, SuperUserFormSchema } from '@/module/auth/types';

const SignInForm = () => {
  const form = useForm<SuperUserFormPayload>({
    resolver: zodResolver(SuperUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const postAdmin = usePostSuperAdmin();

  const onSubmit = () => postAdmin(form.getValues());

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username (email)</FormLabel>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </Form>
    </CardContent>
  );
};

export { SignInForm };
