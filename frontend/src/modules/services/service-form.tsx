import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { convertAmountToMiliunits } from '@/lib/utils';
import { ServicePayload, ServiceSchema } from '@/types';
import { FormText } from '@/components/controls/form-text';
import { FormActions } from '@/components/controls/form-actions';
import { AmountInput } from '@/components/controls/amount-input';
import { Grid4 } from '@/components/layout/grid4';

type Props = {
  id?: string;
  defaultValues?: ServiceSchema;
  disabled?: boolean;
  onCancel?: () => void;
  onSubmit: (values: ServicePayload) => void;
};

function ServiceForm({
  id,
  defaultValues,
  disabled,
  onCancel,
  onSubmit,
}: Props) {
  const { t } = useTranslation('services');
  const form = useForm<ServiceSchema>({
    defaultValues: {
      ...defaultValues,
      price: defaultValues?.price?.toString() || '0.00',
    },
    resolver: zodResolver(ServiceSchema),
  });

  const hadleSubmit = (values: ServiceSchema) => {
    const price = parseFloat(values.price || '0.00');
    const priceInMiliunits = convertAmountToMiliunits(price);

    onSubmit({ ...values, price: priceInMiliunits });
  };

  return (
    <div className='py-1 px-4 mx-auto w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(hadleSubmit)} className='space-y-4'>
          <Grid4>
            <div className='md:col-span-3'>
              <FormText
                control={form.control}
                name='description'
                label={t('description')}
              />
            </div>
            <AmountInput
              control={form.control}
              name='price'
              label={t('price')}
            />
          </Grid4>
          <FormActions id={id} disabled={disabled} onCancel={onCancel} />
        </form>
      </Form>
    </div>
  );
}

export { ServiceForm };
