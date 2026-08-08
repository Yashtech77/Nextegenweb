import { PrismaClient, ProjectStatus, ProjectType, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@nextgenwebworks.online';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: 'NextGen Admin',
      role: Role.ADMIN,
      passwordHash,
    },
    create: {
      name: 'NextGen Admin',
      email: adminEmail,
      role: Role.ADMIN,
      passwordHash,
    },
  });

  const clientPasswordHash = await bcrypt.hash('ClientDemo123!', 10);
  const client = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {
      name: 'Ava Founder',
      companyName: 'Nova Labs',
      passwordHash: clientPasswordHash,
    },
    create: {
      name: 'Ava Founder',
      email: 'client@example.com',
      companyName: 'Nova Labs',
      passwordHash: clientPasswordHash,
    },
  });

  const project = await prisma.project.upsert({
    where: { id: 'demo-project-nextgen' },
    update: {},
    create: {
      id: 'demo-project-nextgen',
      title: 'Nova Labs Client Portal',
      description: 'A premium client portal for onboarding, project tracking, and billing.',
      projectType: ProjectType.SAAS_PLATFORM,
      coreFeatures: 'Secure login, project dashboard, invoicing, admin workflow, file sharing',
      preferredTechStack: 'Next.js, Prisma, PostgreSQL, Tailwind CSS',
      deadline: new Date(new Date().setDate(new Date().getDate() + 45)),
      budgetRange: '₹2,00,000 - ₹4,00,000',
      referenceLink: 'https://linear.app',
      additionalNotes: 'Need clean onboarding and milestone transparency for enterprise clients.',
      companyName: 'Nova Labs',
      status: ProjectStatus.IN_PROGRESS,
      clientId: client.id,
      quotationAmount: 300000,
      advanceAmount: 120000,
      remainingAmount: 180000,
    },
  });

  await prisma.projectUpdate.deleteMany({
    where: { projectId: project.id },
  });

  await prisma.projectUpdate.createMany({
    data: [
      {
        projectId: project.id,
        title: 'Discovery completed',
        message: 'Requirements aligned and initial delivery roadmap approved.',
        status: ProjectStatus.UNDER_REVIEW,
      },
      {
        projectId: project.id,
        title: 'Sprint 1 started',
        message: 'Dashboard shell, auth, and billing workflows are now in active development.',
        status: ProjectStatus.IN_PROGRESS,
      },
    ],
  });

  console.log('Seed completed.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
