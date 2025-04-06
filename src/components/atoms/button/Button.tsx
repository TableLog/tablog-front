import React from 'react';

import { cn } from '@/utils/cn';

interface IButtonProps {
  onClick?: () => void;
  size?: 'mini' | 'small' | 'medium' | 'large';
  buttonColor?: 'primary' | 'grey04' | 'grey06' | 'white';
  full?: boolean;
  children: React.ReactNode;
}

const sizeClasses = {
  mini: 'h-6 text-14', // height: 24px
  small: 'h-[30px] text-14', // height: 30px
  medium: 'h-9 text-base', // height: 36px
  large: 'h-10 text-base', // height: 40px
};

const colorClasses = {
  primary: 'btn-primary text-white',
  grey04: 'btn-neutral text-white',
  grey06: 'btn-info text-white',
  white: 'bg-[var(--color-base-000)] text-black',
};

export default function Button({
  size = 'large',
  buttonColor = 'primary',
  full,
  children,
  ...rest
}: IButtonProps) {
  const isFullWidth = full ? 'w-full' : '';

  return (
    <button
      {...rest}
      role="button-component"
      className={cn(
        'btn rounded-full border-none px-4 font-medium shadow-none',
        sizeClasses[size],
        colorClasses[buttonColor],
        isFullWidth,
      )}
    >
      {children}
    </button>
  );
}
