import { PaymentStatus, ProjectStatus } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import { getRazorpayClient } from '@/lib/payments/razorpay';
import { prisma } from '@/lib/prisma';
import { createPaymentOrderSchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json({ error: 'Please log in to continue.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createPaymentOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
    }

    const { projectId, paymentType, milestoneId } = parsed.data;
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { milestones: true },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    if (user.role !== 'ADMIN' && project.clientId !== user.id) {
      return NextResponse.json({ error: 'You do not have access to this project.' }, { status: 403 });
    }

    let amount = 0;

    if (paymentType === 'ADVANCE') {
      amount = Number(project.advanceAmount ?? 0);
    } else if (paymentType === 'FINAL') {
      amount = Number(project.remainingAmount ?? 0);
    } else {
      const milestone = project.milestones.find((item) => item.id === milestoneId);
      amount = Number(milestone?.amount ?? 0);
    }

    if (!amount) {
      return NextResponse.json(
        { error: 'No payable amount has been configured for this payment stage yet.' },
        { status: 400 }
      );
    }

    const alreadyPaid = projectId
      ? await prisma.payment.findFirst({
          where: {
            projectId: project.id,
            paymentType,
            milestoneId: milestoneId ?? null,
            status: PaymentStatus.PAID,
          },
        })
      : null;

    if (alreadyPaid) {
      return NextResponse.json(
        { error: 'This payment stage has already been paid.' },
        { status: 409 }
      );
    }

    const razorpay = getRazorpayClient();
    const shortReceipt = [
      project.id.slice(0, 12),
      paymentType.slice(0, 3),
      Date.now().toString().slice(-8),
    ].join('-');

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: shortReceipt,
      notes: {
        projectId: project.id,
        paymentType,
        milestoneId: milestoneId ?? '',
      },
    });

    const payment = await prisma.payment.create({
      data: {
        projectId: project.id,
        userId: user.id,
        milestoneId,
        amount,
        paymentType,
        status: PaymentStatus.CREATED,
        razorpayOrderId: order.id,
      },
    });

    if (paymentType === 'ADVANCE' && project.status === ProjectStatus.QUOTED) {
      await prisma.project.update({
        where: { id: project.id },
        data: {
          status: ProjectStatus.ADVANCE_PENDING,
        },
      });
    }

    return NextResponse.json({
      key: process.env.RAZORPAY_KEY_ID,
      order,
      paymentId: payment.id,
      amount,
      currency: 'INR',
    });
  } catch (error) {
    console.error('create order error', error);
    return NextResponse.json(
      { error: 'Unable to create a payment order. Please try again shortly.' },
      { status: 500 }
    );
  }
}
