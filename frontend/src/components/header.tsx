type HeaderProps = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <header className='flex h-18 items-center justify-between px-5 border-b border-slate-200 dark:border-slate-700'>
      {children}
    </header>
  );
};

export { Header };
