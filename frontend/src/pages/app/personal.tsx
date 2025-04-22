import { usePersonal } from '@/module/personal/hooks/use-personal';
import { PersonalForm } from '@/module/personal/personal-form';

export default function PersonalPage() {
  const { data, isLoading } = usePersonal();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    );
  }

  const personal = data?.data ?? null;

  return (
    <div className='flex flex-col gap-4 p-4 w-md mx-auto'>
      <PersonalForm personal={personal} />
    </div>
  );
}
