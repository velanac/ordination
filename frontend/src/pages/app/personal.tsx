import { Separator } from '@/components/ui/separator';
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
    <div className='container mx-auto'>
      <div className='p-4 mx-auto'>
        <h1 className='text-2xl font-bold'>Personal Information</h1>
        <p className='text-sm text-muted-foreground'>
          This information will be used to generate your resume. Please fill in
          all the fields.
        </p>
        <Separator className='my-4' />
      </div>
      <PersonalForm personal={personal} />
    </div>
  );
}
