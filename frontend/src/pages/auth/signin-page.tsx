import { AuthCard } from '@/module/auth/auth-card';
import useInit from '@/module/auth/hooks/use-init';
import { SignInForm } from '@/module/auth/signin-form';
import { SignUpForm } from '@/module/auth/signup-form';

const SignInPage = () => {
  const { data, isLoading } = useInit();

  return (
    <AuthCard>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !data?.data.isOpen && <SignUpForm />}
      {!isLoading && data?.data.isOpen && <SignInForm />}
    </AuthCard>
  );
};

export { SignInPage };
