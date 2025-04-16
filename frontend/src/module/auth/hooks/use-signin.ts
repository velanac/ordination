import { SignInFormPayload } from '@/module/auth/types';

export const useSignIn = () => {
  const signin = async (palyoad: SignInFormPayload) => {
    try {
      const res = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: palyoad.email,
          password: palyoad.password,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      } else {
        alert('Sign in successfully');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return signin;
};
