import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type Props = {
  title?: string;
  description?: string;
  onCancelClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

function FormContainer({
  title,
  description,
  onCancelClick,
  children,
  className,
}: Props) {
  return (
    <div className={cn('container mx-auto h-full w-full', className)}>
      <div className='py-2 px-4  mx-auto flex items-center justify-between '>
        <div className=''>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
        <Button type='button' onClick={onCancelClick} variant='ghost'>
          <X className='size-6' />
        </Button>
      </div>
      <Separator className='my-2 mb-5' />
      {children}
    </div>
  );
}

export { FormContainer };
