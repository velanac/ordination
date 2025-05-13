type Props = {
  children: React.ReactNode;
};

function Grid2({ children }: Props) {
  return <div className='grid md:grid-cols-2 gap-4'>{children}</div>;
}

export { Grid2 };
