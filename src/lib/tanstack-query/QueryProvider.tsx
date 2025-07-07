'use client';

import React from 'react';
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchInterval: 360 * 1000 * 3, // 3 hrs
        staleTime: Infinity,
        gcTime: Infinity,
        placeholderData: keepPreviousData,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />

      {children}
    </QueryClientProvider>
  );
};
