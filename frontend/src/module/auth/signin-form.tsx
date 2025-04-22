import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSignIn } from '@/module/auth/hooks/use-signin';
import { SignInFormPayload, SignInFormSchema } from '@/module/auth/types';
import { PasswordInput } from '@/components/ui/password-input';

const SignInForm = () => {
  const { t } = useTranslation('auth');
  const form = useForm<SignInFormPayload>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signin = useSignIn();

  const onSubmit = () => signin(form.getValues());

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signin.email')}</FormLabel>
                <FormControl>
                  <Input placeholder='example@mail.com' {...field} />
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
                <FormLabel>{t('signin.password')}</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={t('signin.password')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            {t('signin.submitButton')}
          </Button>
        </form>
      </Form>
    </CardContent>
  );
};

export { SignInForm };
