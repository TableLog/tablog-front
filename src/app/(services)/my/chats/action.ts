'use server';

import { cookies } from 'next/headers';

export async function getAccessToken() {
  try {
    const accessToken = (await cookies()).get('accessToken')?.value;
    return accessToken;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to get access token');
  }
}
