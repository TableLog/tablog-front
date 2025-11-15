import React from 'react';

export default function SearchUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative min-h-[calc(100dvh-60px)] px-5 pb-4">{children}</div>;
}
