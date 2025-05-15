import React from 'react';

export default function MyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative px-5 py-4">{children}</div>;
}
