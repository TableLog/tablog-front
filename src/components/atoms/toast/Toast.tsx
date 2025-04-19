'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';

import { Text } from '../text/Text';

interface IToastProps {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  clearErrorMessage: () => void;
}

const Toast = ({ type, message, clearErrorMessage }: IToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // 3초 후 상태 변경
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 클린업
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      clearErrorMessage();
    }, 4000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 클린업
  }, [clearErrorMessage]);

  const opacityClass = visible ? 'opacity-100' : 'opacity-0';
  const backgroundClass = {
    success: 'bg-primary01 text-white01',
    info: 'bg-grey07',
    warning: 'bg-yellow01',
    error: 'bg-red01 text-white01',
  }[type];

  return (
    <div
      className={cn(
        opacityClass,
        'fixed top-1/2 left-1/2 z-50 w-[calc(100%-40px)] -translate-1/2 break-keep transition-opacity duration-1000',
      )}
    >
      <div className={cn(backgroundClass, `alert justify-center border-0`)}>
        <Text fontSize={12} className="text-center">
          {message}
        </Text>
      </div>
    </div>
  );
};

export default Toast;
