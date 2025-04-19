import { SignOut } from '@/components/signout';

const Dashboard = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow'>
        <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
        <div className='flex justify-center items-center'>
          <SignOut />
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
