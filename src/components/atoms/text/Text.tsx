import React from 'react';
import clsx from 'clsx';

import { COLOR_MAP, FONT_SIZE_MAP, FONT_WEIGHT_MAP } from '@/styles/style-map';

type FontWeight = keyof typeof FONT_WEIGHT_MAP;
type Color = keyof typeof COLOR_MAP;
type Size = keyof typeof FONT_SIZE_MAP;

export interface ITextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fontSize?: Size;
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
  const fontClass = FONT_SIZE_MAP[fontSize] || 'text-sm';
  const weightClass = FONT_WEIGHT_MAP[fontWeight] || 'font-normal';
  const colorClass = color ? COLOR_MAP[color] : undefined;
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
