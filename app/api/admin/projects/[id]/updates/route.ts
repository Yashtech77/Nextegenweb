import { NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { projectUpdateSchema } from '@/lib/validators';

interface Context {
  params: { id: string };
}

export async function POST(request: Request, { params }: Context) {
  try {
    const admin = await requireApiAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const parsed = projectUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
    }

    const update = await prisma.projectUpdate.create({
      data: {
        projectId: params.id,
        title: parsed.data.title,
        message: parsed.data.message,
        status: parsed.data.status,
        visibility: parsed.data.visibility,
      },
    });

    if (parsed.data.status) {
      await prisma.project.update({
        where: { id: params.id },
        data: {
          status: parsed.data.status,
        },
      });
    }

    return NextResponse.json(update);
  } catch (error) {
    console.error('update create error', error);
    return NextResponse.json({ error: 'Unable to publish project update.' }, { status: 500 });
  }
}
