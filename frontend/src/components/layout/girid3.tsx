type Props = {
  children: React.ReactNode;
};

function Grid3({ children }: Props) {
  return <div className='grid md:grid-cols-3 gap-4'>{children}</div>;
}

export { Grid3 };
