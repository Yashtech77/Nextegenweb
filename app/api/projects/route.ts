import { FileCategory, ProjectStatus, Role } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import { sendProjectSubmittedEmail } from '@/lib/notifications';
import { prisma } from '@/lib/prisma';
import { projectInquirySchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = projectInquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid project data.' },
        { status: 400 }
      );
    }

    const sessionUser = await getSessionUser();
    const {
      fullName,
      email,
      companyName,
      projectTitle,
      projectType,
      projectDescription,
      coreFeaturesRequired,
      preferredTechStack,
      deadline,
      budgetRange,
      referenceLink,
      additionalNotes,
      attachmentNames,
      attachmentUrls,
    } = parsed.data;

    let clientId = sessionUser?.id;

    if (!clientId) {
      const existing = await prisma.user.findUnique({ where: { email } });

      if (existing && existing.role === Role.ADMIN) {
        return NextResponse.json(
          { error: 'Please use a client email address when submitting a project inquiry.' },
          { status: 400 }
        );
      }

      const lead = existing
        ? await prisma.user.update({
            where: { email },
            data: {
              name: fullName,
              companyName,
            },
          })
        : await prisma.user.create({
            data: {
              name: fullName,
              email,
              companyName,
              role: Role.CLIENT,
            },
          });

      clientId = lead.id;
    }

    const project = await prisma.project.create({
      data: {
        title: projectTitle,
        description: projectDescription,
        projectType,
        coreFeatures: coreFeaturesRequired,
        preferredTechStack,
        deadline: deadline ? new Date(deadline) : null,
        budgetRange,
        referenceLink,
        additionalNotes,
        companyName,
        status: ProjectStatus.INQUIRY_RECEIVED,
        clientId,
        updates: {
          create: {
            title: 'Inquiry received',
            message:
              'Your project request is now in our intake queue. We will review scope, timeline, and quotation details shortly.',
            status: ProjectStatus.INQUIRY_RECEIVED,
          },
        },
        files: attachmentUrls.length
          ? {
              create: attachmentUrls.map((fileUrl, index) => ({
                fileName: attachmentNames[index] || `Attachment ${index + 1}`,
                fileUrl,
                category: FileCategory.REQUIREMENT,
                uploadedById: clientId,
              })),
            }
          : undefined,
      },
      include: {
        client: true,
      },
    });

    await sendProjectSubmittedEmail(email, projectTitle);

    return NextResponse.json({
      project: {
        id: project.id,
        title: project.title,
        status: project.status,
      },
      nextStep: sessionUser
        ? '/dashboard'
        : project.client.passwordHash
          ? `/client/login?email=${encodeURIComponent(email)}`
          : `/auth/signup?email=${encodeURIComponent(email)}`,
    });
  } catch (error) {
    console.error('project submission error', error);
    return NextResponse.json(
      { error: 'We could not submit your project inquiry right now.' },
      { status: 500 }
    );
  }
}
