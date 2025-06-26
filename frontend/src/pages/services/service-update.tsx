import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { ServicePayload } from '@/types';
import { Spinner } from '@/components/spinner';
import { ToastService } from '@/lib/toast-service';
import { convertAmountFromMiliunits } from '@/lib/utils';
import { FormContainer } from '@/components/form-container';
import { ServiceForm } from '@/modules/services/service-form';
import { useService } from '@/modules/services/hooks/use-service';
import { useServicePath } from '@/modules/services/hooks/use-service-path';
import { useServiceDelete } from '@/modules/services/hooks/use-service-delete';

function ServiceUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const update = useServicePath();
  const deleteAction = useServiceDelete(id!);
  const [disable, setDisable] = useState(false);
  const { t } = useTranslation('services');
  const { isLoading, data } = useService(id);

  const closePage = () => navigate(-1);

  const handleSubmit = (data: ServicePayload) => {
    setDisable(true);
    update.mutate(
      { data, id: id! },
      {
        onSuccess: () => {
          ToastService.success('Office updated successfully');
          closePage();
        },
        onError: (err) => {
          ToastService.error(`Something went wrong: ${err?.message}`);
        },
        onSettled: () => {
          setDisable(false);
        },
      }
    );
  };

  const handleDelete = () => {
    deleteAction.mutate();
    ToastService.success('Office deleted successfully');
    closePage();
  };

  return (
    <FormContainer
      id={id}
      title={t('editService')}
      description={t('editDescription')}
      onDelete={handleDelete}
    >
      {isLoading && <Spinner />}
      {data && (
        <ServiceForm
          id={id}
          disabled={isLoading || disable}
          defaultValues={{
            ...data,
            price: convertAmountFromMiliunits(data.price).toString(),
          }}
          onSubmit={handleSubmit}
          onCancel={closePage}
        />
      )}
    </FormContainer>
  );
}

export { ServiceUpdate };
