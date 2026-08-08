import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  createSessionToken,
  sessionCookieName,
  sessionCookieOptions,
} from '@/lib/auth/session';
import { signUpSchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid signup data.' },
        { status: 400 }
      );
    }

    const { name, email, password, companyName } = parsed.data;
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing?.passwordHash) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please log in instead.' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = existing
      ? await prisma.user.update({
          where: { email },
          data: {
            name,
            companyName,
            passwordHash,
            role: existing.role ?? Role.CLIENT,
          },
        })
      : await prisma.user.create({
          data: {
            name,
            email,
            companyName,
            passwordHash,
            role: Role.CLIENT,
          },
        });

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
    });

    response.cookies.set(sessionCookieName, token, sessionCookieOptions);

    return response;
  } catch (error) {
    console.error('signup error', error);
    return NextResponse.json({ error: 'Unable to create account right now.' }, { status: 500 });
  }
}
