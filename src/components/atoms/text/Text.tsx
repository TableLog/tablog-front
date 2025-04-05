import React from 'react';
import clsx from 'clsx';

import { FONT_SIZE_MAP, FONT_WEIGHT_MAP, TEXT_COLOR_MAP } from '@/styles/style-map';

type FontWeight = keyof typeof FONT_WEIGHT_MAP;
type Color = keyof typeof TEXT_COLOR_MAP;
type Size = keyof typeof FONT_SIZE_MAP;

export interface ITextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fontSize?: Size;
  fontWeight?: FontWeight;
  color?: Color;
}

export function Text({
  children,
  fontSize = 0,
  fontWeight = 'regular',
  color,
  className,
  ...rest
}: ITextProps) {
  const fontClass = FONT_SIZE_MAP[fontSize];
  const weightClass = FONT_WEIGHT_MAP[fontWeight] || 'font-normal';
  const colorClass = color ? TEXT_COLOR_MAP[color] : undefined;
  const lineHeightClass = 'leading-[1.5]';

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
