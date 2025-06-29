import { useOfficesEvents } from './use-offices-events';

const useFilterOfficeEvents = (officeId: string) => {
  const { data, isLoading, error } = useOfficesEvents();

  const office = data?.find((office) => office.id === officeId) || null;

  return {
    data: office,
    isLoading,
    error,
  };
};

export { useFilterOfficeEvents };
