import { useProfile } from '@/hooks/use-profile';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSignOut } from '@/hooks/use-signout';

const ProfileMenu = () => {
  const { data, isLoading } = useProfile();
  const signout = useSignOut();

  if (isLoading) {
    return <div className='flex'>Loading...</div>; // Loading state
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
          <span className='font-normal text-sm'>Sign as</span>
          <span>{data?.data.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={signout}>Signout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ProfileMenu };
