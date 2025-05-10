import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { message: 'Logged out' },
    {
      status: 200,
      headers: {
        'Set-Cookie': [
          'accessToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
          'refreshToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
          'Google-Access-Token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
          'Google-Refresh-Token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
          'Kakao-Access-Token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
          'Kakao-Refresh-Token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
        ].join(', '), // 여러 개일 땐 join 사용
      },
    },
  );
}
