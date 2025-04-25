import { ReactNode } from 'react';

interface IContentProps {
  children: ReactNode;
}

export default function Content({ children }: IContentProps) {
  return <section className="px-[20px] pt-[16px]">{children}</section>;
}
