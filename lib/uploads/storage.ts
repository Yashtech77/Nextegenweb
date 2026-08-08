import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export async function saveUploadedFile(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeName = `${Date.now()}-${file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
  const uploadDirectory = path.join(process.cwd(), 'public', 'uploads');

  await mkdir(uploadDirectory, { recursive: true });

  const absolutePath = path.join(uploadDirectory, safeName);
  await writeFile(absolutePath, buffer);

  return {
    fileName: file.name,
    fileUrl: `/uploads/${safeName}`,
  };
}
