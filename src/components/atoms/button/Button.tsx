import React, { ComponentProps } from 'react';
import Link from 'next/link';

import { cn } from '@/utils/cn';

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

type ButtonProps = ComponentProps<'button'> | ComponentProps<typeof Link>;

interface IButtonProps {
  onClick?: () => void;
  size?: 'mini' | 'small' | 'medium' | 'large';
  buttonColor?: 'primary' | 'grey04' | 'grey06' | 'white';
  full?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
  form?: string;
}
export default function Button({
  size = 'large',
  buttonColor = 'primary',
  full,
  type = 'button',
  children,
  className,
  ...rest
}: IButtonProps & ButtonProps) {
  const isFullWidth = full ? 'flex-grow w-full' : '';
  const disabledClass = rest.disabled ? 'bg-grey04 pointer-events-none' : '';

  if ('href' in rest)
    return (
      <Link
        {...rest}
        className={cn(
          'btn rounded-full border-none px-4 font-medium shadow-none',
          sizeClasses[size],
          colorClasses[buttonColor],
          isFullWidth,
          disabledClass,
          className,
        )}
      >
        {children}
      </Link>
    );

  return (
    <button
      {...rest}
      type={type}
      form={rest.form}
      className={cn(
        'btn rounded-full border-none px-4 font-medium shadow-none',
        sizeClasses[size],
        colorClasses[buttonColor],
        isFullWidth,
        disabledClass,
        className,
      )}
    >
      {children}
    </button>
  );
}
