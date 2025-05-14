import { Separator } from '@/components/ui/separator';
import { Button } from './ui/button';

type Propos = {
  title: string;
  description: string;
  addNewButtonTitle: string;
  onAddClick: () => void;
  children: React.ReactNode;
};

function DataTableContainer({
  title,
  description,
  addNewButtonTitle,
  onAddClick,
  children,
}: Propos) {
  return (
    <div className='container mx-auto'>
      <div className='px-4 py-2 mx-auto flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
        <Button onClick={onAddClick}>{addNewButtonTitle}</Button>
      </div>
      <Separator className='my-1' />
      <div className='flex px-4 mx-auto'>{children}</div>
    </div>
  );
}

export { DataTableContainer };
