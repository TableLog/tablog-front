import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logged out' },
    {
      status: 200,
    },
  );

  // 쿠키 삭제
  const cookiesToDelete = [
    'accessToken',
    'refreshToken',
    'Google-Access-Token',
    'Google-Refresh-Token',
    'Kakao-Access-Token',
    'Kakao-Refresh-Token',
  ];

  cookiesToDelete.forEach((cookieName) => {
    response.cookies.set(cookieName, '', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 0,
    });
  });

  return response;
}
