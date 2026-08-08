'use client';

import { useState } from 'react';
import { FileCategory } from '@prisma/client';
import { Loader2, UploadCloud } from 'lucide-react';

const fileCategoryOptions: { value: FileCategory; label: string }[] = [
  { value: FileCategory.REQUIREMENT, label: 'Requirement' },
  { value: FileCategory.REFERENCE, label: 'Reference' },
  { value: FileCategory.DELIVERABLE, label: 'Deliverable' },
  { value: FileCategory.REVISION, label: 'Revision' },
  { value: FileCategory.OTHER, label: 'Other' },
];

export default function ProjectFileUploader({
  projectId,
  defaultCategory,
}: {
  projectId: string;
  defaultCategory: FileCategory;
}) {
  const [category, setCategory] = useState<FileCategory>(defaultCategory);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleUpload(fileList: FileList | null) {
    if (!fileList?.length) return;

    try {
      setUploading(true);
      setMessage(null);

      await Promise.all(
        Array.from(fileList).map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('projectId', projectId);
          formData.append('category', category);

          const response = await fetch('/api/uploads', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error ?? 'Upload failed.');
          }
        })
      );

      setMessage('Files uploaded successfully.');
      window.location.reload();
    } catch (error) {
      console.error(error);
      setMessage(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5">
      <h3 className="font-display text-lg font-bold text-white">Upload Project Files</h3>
      <p className="mt-2 text-sm text-slate-400">Share deliverables, revisions, or supporting documents directly inside the project workspace.</p>
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as FileCategory)}
          className="w-full rounded-2xl border border-white/[0.1] bg-[#0b1323] px-4 py-3 text-sm text-white outline-none md:max-w-xs"
        >
          {fileCategoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label className="btn-secondary cursor-pointer">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
          Upload Files
          <input type="file" className="hidden" multiple onChange={(event) => handleUpload(event.target.files)} />
        </label>
      </div>
      {message ? <p className="mt-3 text-xs text-slate-400">{message}</p> : null}
    </div>
  );
}
