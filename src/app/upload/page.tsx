// src/app/upload/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>(''); // State for name
  const [description, setDescription] = useState<string>(''); // State for description
  const [company, setCompany] = useState<string>(''); // State for company

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !name || !description || !company) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const data = new FormData();
      data.set('file', file);
      data.set('name', name);
      data.set('description', description);
      data.set('company', company);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());

      alert('File and information uploaded successfully!');
      setFile(null);
      setName('');
      setDescription('');
      setCompany('');

      //sender til uploads siden
      router.push('/uploads');

    } catch (e) {
      console.error('Upload failed:', e);
    }
  };

  return (
    <main>
      <h1>Upload Projekt</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <input type="submit" value="Upload" />
      </form>
    </main>
  );
}
