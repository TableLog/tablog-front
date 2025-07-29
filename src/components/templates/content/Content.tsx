import { ReactNode } from 'react';

interface IContentProps {
  children: ReactNode;
}

export default function Content({ children }: IContentProps) {
  return <section className="px-5 pt-4">{children}</section>;
}
