import { ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface IContentProps {
  className?: string;
  children: ReactNode;
}

export default function Content({ className, children }: IContentProps) {
  return <section className={cn('px-5 pt-4', className)}>{children}</section>;
}
