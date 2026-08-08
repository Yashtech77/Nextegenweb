import { FileCategory } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { saveUploadedFile } from '@/lib/uploads/storage';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const projectId = formData.get('projectId')?.toString();
    const category = (formData.get('category')?.toString() as FileCategory | undefined) ?? FileCategory.OTHER;
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please choose a file to upload.' }, { status: 400 });
    }

    const uploaded = await saveUploadedFile(file);

    if (!projectId) {
      return NextResponse.json(uploaded);
    }

    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json({ error: 'Please log in to upload files.' }, { status: 401 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true, clientId: true },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    if (user.role !== 'ADMIN' && project.clientId !== user.id) {
      return NextResponse.json({ error: 'You do not have access to this project.' }, { status: 403 });
    }

    const fileRecord = await prisma.fileUpload.create({
      data: {
        projectId,
        fileName: uploaded.fileName,
        fileUrl: uploaded.fileUrl,
        category,
        uploadedById: user.id,
      },
    });

    return NextResponse.json(fileRecord);
  } catch (error) {
    console.error('upload error', error);
    return NextResponse.json({ error: 'File upload failed.' }, { status: 500 });
  }
}
