import React from 'react';

export interface IBoxIconProps {
  onClick?: () => void;
  name?: string;
  type?: 'solid' | 'regular' | 'logo';
  color?: string;
  size?: string;
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

export function BoxIcon({ ...rest }: IBoxIconProps) {
  return (
    <i
      role="icon"
      className={`bx bx-${rest.name} bx-rotate-${rest.rotate} bx-flip-${rest.flip} bx-pull-${rest.pull} bx-${rest.animation} bx-${rest.animation} bx-${rest.animation}-hover`}
      style={{ color: rest.color, fontSize: rest.size }}
    />
  );
}
