import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = Boolean(request.cookies.get('auth_token'));

  const pathname = request.nextUrl.pathname;

  // 로그인 안 했는데, 로그인 후 페이지에 접근하려는 경우
  if (!isLoggedIn && pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 로그인 했는데, 로그인/회원가입 페이지에 접근하려는 경우
  if (isLoggedIn && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}
