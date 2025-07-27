'use client';

import { cn } from '@/utils/cn';

interface ITitleProps {
  onClick: () => void;
  className?: string;
}

const Title = ({ onClick: onClick, className }: ITitleProps) => {
  return (
    <h3 className={cn('font-semibold text-white01', className)} onClick={onClick}>
      식탁일기
    </h3>
  );
};

export default Title;
