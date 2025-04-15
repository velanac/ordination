import { AuthCard } from '@/module/auth/auth-card';
import { SignUpForm } from '@/module/auth/signup-form';

const SignInPage = () => {
  return (
    <AuthCard>
      <SignUpForm />
    </AuthCard>
  );
};

export { SignInPage };
