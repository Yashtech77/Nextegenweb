interface NotificationPayload {
  to: string;
  subject: string;
  html: string;
}

async function sendNotification(payload: NotificationPayload) {
  if (!process.env.EMAIL_FROM) {
    console.info('Notification preview', payload);
    return;
  }

  console.info('Email provider not configured, previewing notification', payload);
}

export async function sendProjectSubmittedEmail(email: string, projectTitle: string) {
  await sendNotification({
    to: email,
    subject: `Project inquiry received: ${projectTitle}`,
    html: `<p>We received your inquiry for <strong>${projectTitle}</strong>. Our team will review scope and get back to you with next steps shortly.</p>`,
  });
}

export async function sendQuotationReadyEmail(email: string, projectTitle: string) {
  await sendNotification({
    to: email,
    subject: `Quotation ready for ${projectTitle}`,
    html: `<p>Your quotation for <strong>${projectTitle}</strong> is now available in your NextGenWebWorks client portal.</p>`,
  });
}

export async function sendPaymentReceivedEmail(email: string, projectTitle: string, paymentType: string) {
  await sendNotification({
    to: email,
    subject: `${paymentType} payment received for ${projectTitle}`,
    html: `<p>We have recorded your ${paymentType.toLowerCase()} payment for <strong>${projectTitle}</strong>.</p>`,
  });
}
