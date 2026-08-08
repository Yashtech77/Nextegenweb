import { NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { projectStatusSchema } from '@/lib/validators';

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
    const parsed = projectStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        status: parsed.data.status,
        updates: {
          create: {
            title: 'Project status updated',
            message: `Project status has been updated to ${parsed.data.status.replace(/_/g, ' ').toLowerCase()}.`,
            status: parsed.data.status,
          },
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('status update error', error);
    return NextResponse.json({ error: 'Unable to update project status.' }, { status: 500 });
  }
}
