type Props = {
  children: React.ReactNode;
};

function Grid4({ children }: Props) {
  return <div className='grid md:grid-cols-4 gap-4'>{children}</div>;
}

export { Grid4 };
