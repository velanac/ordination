import { QueryClient } from '@tanstack/react-query';

export const queryKeys = {
  init: 'init',
  profile: 'profile',
  personal: 'personal',
  patients: 'patients',
};

function queryErrorHandler(error: Error): void {
  if (error instanceof Error) {
    alert(error.message);
  }

  if (error.name === 'AbortError') {
    return;
  }
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  //   const data: any = request.isAxiosError(error) ? error.response?.data : null;
  //   const title = request.isAxiosError(error)
  //     ? data
  //       ? data.message
  //       : 'error connecting to server'
  //     : 'Unknow error';
  // prevent duplicate toasts
  //   toast.error(title);
}

// to satisfy typescript until this file has uncommented contents
export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000, // 10 minutes // default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        onError: queryErrorHandler,
      },
    },
  });
}

export const queryClient = generateQueryClient();
