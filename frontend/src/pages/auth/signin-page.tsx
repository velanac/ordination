import { AuthCard } from '@/modules/auth/auth-card';
import useInit from '@/modules/auth/hooks/use-init';
import { SignInForm } from '@/modules/auth/signin-form';
import { SignUpForm } from '@/modules/auth/signup-form';

const SignInPage = () => {
  const { data, isLoading } = useInit();

  return (
    <AuthCard>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !data?.isOpen && <SignUpForm />}
      {!isLoading && data?.isOpen && <SignInForm />}
    </AuthCard>
  );
};

export { SignInPage };
