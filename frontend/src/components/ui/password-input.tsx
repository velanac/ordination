import * as React from 'react';

import { cn } from '@/lib/utils';
import { Eye, Lock, EyeOff } from 'lucide-react';
import { Button } from './button';

function PasswordInput({ className, ...props }: React.ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
    >
      <Lock className='w-6 h-6' />
      <input
        type={showPassword ? 'text' : 'password'}
        className={cn(
          'w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      <Button
        type='button'
        asChild
        size='icon'
        variant='ghost'
        className='mr-2'
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <Eye className='w-6 h-6' />
        ) : (
          <EyeOff className='w-6 h-6' />
        )}
      </Button>
    </div>
  );
}

export { PasswordInput };
