import React from 'react';

import LoadingSpinner from './LoadingSpinner';

const LoadingScreen = () => {
  return (
    <div className="bg-white01 fixed inset-0 z-[200] flex h-screen w-screen flex-col items-center justify-center gap-4">
      <LoadingSpinner />
      🍳 로딩 중
    </div>
  );
};

export default LoadingScreen;
