import { EventCalendar } from '@/components/controls/event-calendar';
import { Button } from '@/components/ui/button';
import { useOffice } from '@/modules/offices/hooks/use-office';
import { X } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useDoctors } from '@/hooks/use-doctors';

function OfficeEventsPage() {
  const { officeId } = useParams<{ officeId: string }>();
  const { data, isLoading } = useOffice(officeId);
  const { data: doctors, isLoading: isDoctorsLoading } = useDoctors();

  if (isDoctorsLoading) {
    return <div>Loading doctors...</div>;
  }

  console.log('doctors', doctors);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex w-full flex-col items-center justify-center p-4'>
      <div className='flex justify-between items-center w-full mb-4'>
        <h2 className='text-2xl font-bold'>{data?.data.name}</h2>
        <Button variant='ghost' asChild>
          <Link to='/app/appointments'>
            <X />
          </Link>
        </Button>
      </div>
      <div className='mb-4 flex justify-end w-full'>
        <SheetDemo />
      </div>
      <div className='flex w-full flex-col items-center justify-center'>
        <EventCalendar />
      </div>
    </div>
  );
}

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Add Doctor Event</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-demo-name'>Name</Label>
            <Input id='sheet-demo-name' defaultValue='Pedro Duarte' />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-demo-username'>Username</Label>
            <Input id='sheet-demo-username' defaultValue='@peduarte' />
          </div>
        </div>
        <SheetFooter>
          <Button type='submit'>Save changes</Button>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { OfficeEventsPage };
