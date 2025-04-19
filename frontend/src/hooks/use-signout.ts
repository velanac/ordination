import { queryClient } from '@/lib/query-client';
import { useNavigate } from 'react-router';

export const useSignOut = () => {
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const res = await fetch('/api/v1/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      } else {
        alert('Sign in successfully');
        // location.reload();
        queryClient.clear();
        navigate('/'); // Redirect to the sign-in page
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return signin;
};
