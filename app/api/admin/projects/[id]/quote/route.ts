import { NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/auth/session';
import { sendQuotationReadyEmail } from '@/lib/notifications';
import { prisma } from '@/lib/prisma';
import { quoteSchema } from '@/lib/validators';

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
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        quotationAmount: parsed.data.quotationAmount,
        advanceAmount: parsed.data.advanceAmount,
        remainingAmount: parsed.data.remainingAmount,
        status: parsed.data.status,
        updates: {
          create: {
            title: 'Quotation prepared',
            message:
              'A detailed quotation and payment split have been prepared and are now visible in the client workspace.',
            status: parsed.data.status,
          },
        },
      },
    });

    const client = await prisma.user.findUnique({
      where: { id: project.clientId },
      select: { email: true },
    });

    if (client?.email) {
      await sendQuotationReadyEmail(client.email, project.title);
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('quote update error', error);
    return NextResponse.json({ error: 'Unable to save quotation.' }, { status: 500 });
  }
}
