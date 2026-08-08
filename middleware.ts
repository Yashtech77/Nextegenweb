import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const encoder = new TextEncoder();

async function readSession(request: NextRequest) {
  const token = request.cookies.get('ngw_session')?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, encoder.encode(secret));
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const payload = await readSession(request);

  if (pathname.startsWith('/dashboard')) {
    if (!payload?.sub) {
      return NextResponse.redirect(new URL('/client/login', request.url));
    }
  }

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    if (!payload?.sub) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
