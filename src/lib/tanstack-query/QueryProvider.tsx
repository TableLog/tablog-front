'use client';

import React, { useState } from 'react';
import {
  keepPreviousData,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

import { PopupProvider } from '@/components/molecules/popup/PopupProvider';
import { showToast } from '@/utils/functions';

const getErrorMessage = (status?: number) => {
  switch (status) {
    case 403:
      return '해당 기능은 로그인 후 사용 가능합니다.';
    case 413:
      return '파일 크기가 너무 큽니다.';
  }
  return null;
};

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
            if (!axios.isAxiosError(error)) return;

            // 공통 에러 메시지 처리
            const errorMessage = getErrorMessage(error.response?.status);
            if (errorMessage) showToast({ message: errorMessage, type: 'error' });
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PopupProvider>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}

        {children}
      </PopupProvider>
    </QueryClientProvider>
  );
};
