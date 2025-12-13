'use client';

import React, { useState } from 'react';
import {
  keepPreviousData,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

import { showToast } from '@/utils/functions';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchInterval: 360 * 1000 * 3, // 3 hrs
            staleTime: Infinity,
            gcTime: Infinity,
            placeholderData: keepPreviousData,
          },
        },
        mutationCache: new MutationCache({
          onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.status === 403) {
              showToast({ message: '해당 기능은 로그인 후 사용 가능합니다.', type: 'error' });
            }
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />

      {children}
    </QueryClientProvider>
  );
};
