import React from 'react';

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-white01 px-5 py-4">{children}</div>;
}
