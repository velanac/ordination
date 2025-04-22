import { useNavigate } from 'react-router';
import { useProfile } from '@/hooks/use-profile';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useSignOut } from '@/hooks/use-signout';

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useProfile();
  const signout = useSignOut();

  if (isLoading && !data) {
    return <ProfileMenu.Skeleton />;
  }

  const email = data?.data.email || 'User';
  const name = email.split('@')[0]; // Extracting name from email
  const initials = name.charAt(0).toUpperCase(); // Getting the first letter of the name

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='bg-gray-200 mr-2 w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 shadow-2xs'>
          <AvatarImage src='' />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-8'>
        <DropdownMenuLabel className='flex flex-col gap-1 items-start'>
          <span className='font-normal text-sm'>Sign as {data?.data.role}</span>
          <span>{data?.data.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/app/personal')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signout}>Signout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

ProfileMenu.Skeleton = () => <Skeleton className='h-8 w-8 rounded-full' />;

ProfileMenu.displayName = 'ProfileMenu';

export { ProfileMenu };
