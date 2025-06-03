import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  active: z.boolean(),
});

type formSchema = z.infer<typeof formSchema>;

type Props = {
  active: boolean;
};

function GeneraSettingsForm({ active }: Props) {
  const { t } = useTranslation('users');
  const { t: contorlsT } = useTranslation('controls');
  const onSubmit = (data: formSchema) => {
    // Handle form submission logic here
    console.log('Form submitted with data:', data);
  };

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      active: active,
    },
  });

  return (
    <div>
      <div className='py-4 mx-auto w-full'>
        <h2 className='text-lg font-semibold'>{t('generalForm')}</h2>
        <p className='text-sm text-gray-500'>{t('generalFormDescription')}</p>
      </div>
      <Separator className='my-4' />
      <div className=' mx-auto w-full'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6'
          >
            <div>
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='active'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                      <div className='space-y-0.5'>
                        <FormLabel>{t('changeActiveStatus')}</FormLabel>
                        <FormDescription>
                          {t('changeActiveStatusDescription')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='flex justify-end'>
              <Button type='submit'>{contorlsT('saveChanges')}</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export { GeneraSettingsForm };
