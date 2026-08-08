import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  createSessionToken,
  sessionCookieName,
  sessionCookieOptions,
} from '@/lib/auth/session';
import { loginSchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid login details.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (!user?.passwordHash) {
      return NextResponse.json(
        { error: 'Account not found. Please sign up to access your projects.' },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
    }

    if (parsed.data.expectedRole && user.role !== parsed.data.expectedRole) {
      return NextResponse.json(
        {
          error:
            parsed.data.expectedRole === Role.ADMIN
              ? 'This account does not have admin access.'
              : 'Please use the client login for this account.',
        },
        { status: 403 }
      );
    }

    const token = await createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      redirectTo: user.role === Role.ADMIN ? '/admin' : '/dashboard',
    });

    response.cookies.set(sessionCookieName, token, sessionCookieOptions);

    return response;
  } catch (error) {
    console.error('login error', error);
    return NextResponse.json({ error: 'Unable to log in right now.' }, { status: 500 });
  }
}
