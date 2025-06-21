import React from 'react';

import { Z_INDEX } from '@/constants/z-index.constants';

import LoadingSpinner from './LoadingSpinner';

const LoadingScreen = () => {
  return (
    <div
      className={`bg-white01 fixed inset-0 flex h-screen w-screen flex-col items-center justify-center gap-4`}
      style={{ zIndex: Z_INDEX.LOADING_SCREEN }}
    >
      <LoadingSpinner />
      🍳 로딩 중
    </div>
  );
};

export default LoadingScreen;
