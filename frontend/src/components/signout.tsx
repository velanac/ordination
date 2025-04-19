import { useSignOut } from '@/hooks/use-signout';
import { Button } from '@/components/ui/button';

const SignOut = () => {
  const signout = useSignOut();

  return (
    <Button variant='destructive' className='w-full' onClick={() => signout()}>
      Sign Out
    </Button>
  );
};

export { SignOut };
