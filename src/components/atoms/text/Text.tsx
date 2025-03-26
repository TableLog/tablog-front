import React from 'react';
import clsx from 'clsx';

const fontSizeMap: Record<number, string> = {
  12: 'text-xs',
  14: 'text-sm',
  16: 'text-base',
  18: 'text-lg',
  20: 'text-xl',
  24: 'text-2xl',
  30: 'text-3xl',
  36: 'text-4xl',
  48: 'text-5xl',
  60: 'text-6xl',
  72: 'text-7xl',
  96: 'text-8xl',
  128: 'text-9xl',
};

const fontWeightMap = {
  thin: 'font-thin',
  extraLight: 'font-extralight',
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semiBold: 'font-semibold',
  bold: 'font-bold',
  extraBold: 'font-extrabold',
  black: 'font-black',
} as const;

const colorMap = {
  primary01: 'text-primary01',
  primary02: 'text-primary02',
  primary03: 'text-primary03',
  primary04: 'text-primary04',
  primary05: 'text-primary05',
  white01: 'text-white01',
  black01: 'text-black01',
  black02: 'text-black02',
  black03: 'text-black03',
  grey01: 'text-grey01',
  grey02: 'text-grey02',
  grey03: 'text-grey03',
  grey04: 'text-grey04',
  grey05: 'text-grey05',
  grey06: 'text-grey06',
  grey07: 'text-grey07',
  grey08: 'text-grey08',
  red01: 'text-red01',
  yellow01: 'text-yellow01',
} as const;

type FontWeight = keyof typeof fontWeightMap;
type Color = keyof typeof colorMap;

export interface ITextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fontSize?: number;
  fontWeight?: FontWeight;
  color?: Color;
}

export function Text({
  children,
  fontSize = 14,
  fontWeight = 'regular',
  color,
  className,
  ...rest
}: ITextProps) {
  const fontClass = fontSizeMap[fontSize] || 'text-sm';
  const weightClass = fontWeightMap[fontWeight] || 'font-normal';
  const colorClass = color ? colorMap[color] : undefined;
  const lineHeightClass = 'leading-[1.5]'; // ← 여기 추가됨

  return (
    <div
      role="text"
      className={clsx(fontClass, weightClass, colorClass, lineHeightClass, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
