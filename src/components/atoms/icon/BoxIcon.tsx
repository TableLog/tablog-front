import React from 'react';
import clsx from 'clsx';

import { TEXT_COLOR_MAP } from '@/styles/style-map';

type Color = keyof typeof TEXT_COLOR_MAP;

export interface IBoxIconProps {
  onClick?: () => void;
  name?: string;
  type?: 'solid' | 'regular' | 'logo';
  color?: Color | string;
  size?: number;
  animation?:
    | 'spin'
    | 'tada'
    | 'flashing'
    | 'burst'
    | 'fade-left'
    | 'fade-right'
    | 'fade-up'
    | 'fade-down';
  rotate?: '90' | '180' | '270';
  flip?: 'horizontal' | 'vertical';
  pull?: 'left' | 'right';
  class?: string;
}

export function BoxIcon({
  name,
  type,
  color,
  size,
  animation,
  rotate,
  flip,
  pull,
  class: customClass,
  ...rest
}: IBoxIconProps) {
  const isThemeColor = color && TEXT_COLOR_MAP[color as Color];
  const colorClass = isThemeColor ? TEXT_COLOR_MAP[color as Color] : undefined;
  const staticClass = `cursor-pointer`;

  const iconClass = clsx(
    'bx',
    name && `bx-${name}`,
    type && `bxs-${name}`, // optional: if you want to reflect type: 'solid' → bxs-*, 'regular' → bx-*, 'logo' → bxl-*
    rotate && `bx-rotate-${rotate}`,
    flip && `bx-flip-${flip}`,
    pull && `bx-pull-${pull}`,
    animation && [`bx-${animation}`, `bx-${animation}-hover`],
    colorClass,
    staticClass,
    customClass,
  );

  return (
    <i
      role="icon"
      className={iconClass}
      style={!isThemeColor ? { color, fontSize: size } : { fontSize: size }}
      {...rest}
    />
  );
}
