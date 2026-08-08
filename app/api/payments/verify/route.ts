import { PaymentStatus, ProjectStatus } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import { sendPaymentReceivedEmail } from '@/lib/notifications';
import { verifyRazorpaySignature } from '@/lib/payments/razorpay';
import { prisma } from '@/lib/prisma';
import { verifyPaymentSchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json({ error: 'Please log in to continue.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = verifyPaymentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
    }

    const { paymentId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = parsed.data;
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { project: { include: { client: true } } },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment record not found.' }, { status: 404 });
    }

    if (user.role !== 'ADMIN' && payment.userId !== user.id) {
      return NextResponse.json({ error: 'You do not have access to this payment.' }, { status: 403 });
    }

    const isValid = verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

    if (!isValid) {
      await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: PaymentStatus.FAILED,
        },
      });

      return NextResponse.json({ error: 'Payment verification failed.' }, { status: 400 });
    }

    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.PAID,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      },
    });

    let nextStatus = payment.project.status;

    if (payment.paymentType === 'ADVANCE') {
      nextStatus = ProjectStatus.IN_PROGRESS;
    }

    if (payment.paymentType === 'FINAL') {
      nextStatus = ProjectStatus.DELIVERED;
    }

    await prisma.project.update({
      where: { id: payment.projectId },
      data: {
        status: nextStatus,
        updates: {
          create: {
            title: `${payment.paymentType} payment received`,
            message: `Payment confirmed successfully through Razorpay for ${payment.paymentType.toLowerCase()} stage.`,
            status: nextStatus,
          },
        },
      },
    });

    await sendPaymentReceivedEmail(payment.project.client.email, payment.project.title, payment.paymentType);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('verify payment error', error);
    return NextResponse.json({ error: 'Unable to verify payment.' }, { status: 500 });
  }
}
