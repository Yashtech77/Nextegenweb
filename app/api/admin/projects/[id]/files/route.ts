import { NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

interface Context {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Context) {
  try {
    const admin = await requireApiAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const files = await prisma.fileUpload.findMany({
      where: { projectId: params.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(files);
  } catch (error) {
    console.error('admin files fetch error', error);
    return NextResponse.json({ error: 'Unable to fetch files.' }, { status: 500 });
  }
}
