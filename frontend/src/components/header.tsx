type HeaderProps = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <header className='flex w-full px-8 py-5 justify-between border-b border-neutral-200 shadow-sm'>
      {children}
    </header>
  );
};

export { Header };
