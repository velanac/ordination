import { Card, CardContent } from '@/components/ui/card';

interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <Card className='w-[350px]'>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export { AuthCard };
