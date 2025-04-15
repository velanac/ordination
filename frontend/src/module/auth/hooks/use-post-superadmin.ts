import { SuperUserFormPayload } from '@/types/payload/super-user-palyoad';

export const usePostSuperAdmin = () => {
  const postAdmin = async (palyoad: SuperUserFormPayload) => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/opensuperadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: palyoad.email,
          fullName: palyoad.fullName,
          password: palyoad.password,
        }),
      });

      if (!res.ok && res.status !== 204) {
        const err = await res.json();
        throw new Error(err.message);
      } else {
        alert('Super admin created successfully');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return postAdmin;
};
