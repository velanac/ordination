import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { OfficeSchema } from '@/types';
import { Form } from '@/components/ui/form';
import { ToastService } from '@/lib/toast-service';
import { FormText } from '@/components/controls/form-text';
import { FormSubmit } from '@/components/controls/form-submit';
import { useOfficePath } from '@/modules/offices/hooks/use-office-path';
import { useOfficePost } from '@/modules/offices/hooks/use-office-post';

type Props = {
  office?: OfficeSchema | null;
  onSaveSuccess: () => void;
};

function OfficeForm({ office, onSaveSuccess }: Props) {
  const { t } = useTranslation('offices');
  const create = useOfficePost();
  const update = useOfficePath();
  const form = useForm<OfficeSchema>({
    resolver: zodResolver(OfficeSchema),
    defaultValues: {
      name: office?.name || '',
      description: office?.description || '',
    },
  });

  const onSubmit = (data: OfficeSchema) => {
    if (office) {
      update.mutate(
        { data, id: office.id! },
        {
          onSuccess: () => {
            ToastService.success('Office updated successfully');
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
          <FormText control={form.control} name='name' label={t('name')} />
          <FormText
            control={form.control}
            name='description'
            label={t('description')}
          />
          <FormSubmit />
        </form>
      </Form>
    </div>
  );
}

export { OfficeForm };
