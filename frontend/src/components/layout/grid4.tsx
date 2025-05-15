type Props = {
  children: React.ReactNode;
};

function Grid4({ children }: Props) {
  return (
    <div className='grid md:grid-cols-4 h-fit gap-4 items-start'>
      {children}
    </div>
  );
}

export { Grid4 };
