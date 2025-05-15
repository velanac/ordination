type Props = {
  children: React.ReactNode;
};

function Grid3({ children }: Props) {
  return (
    <div className='grid md:grid-cols-3 h-fit gap-4 items-start'>
      {children}
    </div>
  );
}

export { Grid3 };
