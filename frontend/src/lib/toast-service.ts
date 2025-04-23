import { toast } from 'sonner';

const ToastService = {
  success: (message: string) => {
    toast.success(message, {
      description: 'Success',
      duration: 2000,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      description: 'Error',
      duration: 2000,
    });
  },
  info: (message: string) => {
    toast(message, {
      description: 'Info',
      duration: 2000,
    });
  },
};

export { ToastService };
