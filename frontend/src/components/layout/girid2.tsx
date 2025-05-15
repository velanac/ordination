type Props = {
  children: React.ReactNode;
};

function Grid2({ children }: Props) {
  return (
    <div className='grid md:grid-cols-2 h-fit gap-4 items-start'>
      {children}
    </div>
  );
}

export { Grid2 };
