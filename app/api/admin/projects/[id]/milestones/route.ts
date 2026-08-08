import { NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { milestoneSchema } from '@/lib/validators';

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
    const parsed = milestoneSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
    }

    const milestone = await prisma.milestone.create({
      data: {
        projectId: params.id,
        title: parsed.data.title,
        description: parsed.data.description,
        amount: parsed.data.amount,
        status: parsed.data.status,
        dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
      },
    });

    return NextResponse.json(milestone);
  } catch (error) {
    console.error('milestone create error', error);
    return NextResponse.json({ error: 'Unable to create milestone.' }, { status: 500 });
  }
}
