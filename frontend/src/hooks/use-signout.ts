import { useNavigate } from 'react-router';

import { queryClient } from '@/lib/query-client';

export const useSignOut = () => {
  const navigate = useNavigate();

  const signout = async () => {
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
        alert('Sign out successfully');
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

  return signout;
};
