import { PaymentStatus, Prisma, ProjectStatus, Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const projectInclude = {
  client: true,
  milestones: {
    orderBy: {
      createdAt: 'asc' as const,
    },
  },
  payments: {
    orderBy: {
      createdAt: 'desc' as const,
    },
  },
  files: {
    orderBy: {
      createdAt: 'desc' as const,
    },
  },
  updates: {
    orderBy: {
      createdAt: 'desc' as const,
    },
  },
} satisfies Prisma.ProjectInclude;

export async function getClientProjects(clientId: string) {
  return prisma.project.findMany({
    where: { clientId },
    include: projectInclude,
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function getClientProjectById(projectId: string, clientId: string) {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      clientId,
    },
    include: projectInclude,
  });
}

export async function getAdminProjects(status?: ProjectStatus) {
  return prisma.project.findMany({
    where: status ? { status } : undefined,
    include: projectInclude,
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getAdminProjectById(projectId: string) {
  return prisma.project.findUnique({
    where: { id: projectId },
    include: projectInclude,
  });
}

export async function getPlatformSnapshot(userId: string, role: Role) {
  if (role === Role.ADMIN) {
    const [totalProjects, pendingReview, activeProjects, revenue] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({
        where: { status: { in: [ProjectStatus.INQUIRY_RECEIVED, ProjectStatus.UNDER_REVIEW] } },
      }),
      prisma.project.count({
        where: { status: { in: [ProjectStatus.IN_PROGRESS, ProjectStatus.REVIEW, ProjectStatus.MILESTONE_PENDING] } },
      }),
      prisma.payment.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          status: PaymentStatus.PAID,
        },
      }),
    ]);

    return {
      totalProjects,
      pendingReview,
      activeProjects,
      revenue: revenue._sum.amount?.toString() ?? '0',
    };
  }

  const [totalProjects, activeProjects, pendingPayments, revenue] = await Promise.all([
    prisma.project.count({
      where: {
        clientId: userId,
      },
    }),
    prisma.project.count({
      where: {
        clientId: userId,
        status: { in: [ProjectStatus.ADVANCE_PENDING, ProjectStatus.IN_PROGRESS, ProjectStatus.REVIEW] },
      },
    }),
    prisma.payment.count({
      where: {
        userId,
        status: { in: [PaymentStatus.PENDING, PaymentStatus.CREATED] },
      },
    }),
    prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        status: PaymentStatus.PAID,
      },
    }),
  ]);

  return {
    totalProjects,
    activeProjects,
    pendingPayments,
    revenue: revenue._sum.amount?.toString() ?? '0',
  };
}
