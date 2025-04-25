import React from 'react';

// NOTE: 로그인, 회원가입, 계정 찾기 공통 레이아웃
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="px-5">{children}</div>;
}
