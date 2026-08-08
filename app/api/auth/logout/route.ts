import { NextResponse } from 'next/server';
import {
  createClearedSessionCookie,
  sessionCookieName,
} from '@/lib/auth/session';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(sessionCookieName, '', createClearedSessionCookie());
  return response;
}
