import { useTranslation } from 'react-i18next';

import { OfficeSchema } from '@/types';
import { Spinner } from '@/components/spinner';
import { ToastService } from '@/lib/toast-service';
import { useNavigate, useParams } from 'react-router';
import { FormContainer } from '@/components/form-container';
import { OfficeForm } from '@/modules/offices/office-form';
import { useOffice } from '@/modules/offices/hooks/use-office';
import { useOfficePath } from '@/modules/offices/hooks/use-office-path';
import { useOfficeDelete } from '@/modules/offices/hooks/use-office-delete';

function OfficeUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const update = useOfficePath();
  const deleteAction = useOfficeDelete();
  const { t } = useTranslation('offices');
  const { isLoading, data } = useOffice(id);

  const closePage = () => navigate(-1);

  const handleSubmit = (data: OfficeSchema) => {
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
      }
    );
  };

  const handleDelete = () => {
    deleteAction.mutate(id!);
    ToastService.success('Office deleted successfully');
    closePage();
  };

  return (
    <FormContainer
      id={id}
      title={t('edit')}
      description={t('editDescription')}
      onDelete={handleDelete}
    >
      {isLoading && <Spinner />}
      {data && (
        <OfficeForm
          id={id}
          defaultValues={data.data}
          disabled={isLoading}
          onSubmit={handleSubmit}
          onCancel={closePage}
        />
      )}
    </FormContainer>
  );
}

export { OfficeUpdate };
