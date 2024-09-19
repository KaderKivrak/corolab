// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;
  const name: string | null = data.get('name') as string | null;
  const description: string | null = data.get('description') as string | null;
  const company: string | null = data.get('company') as string | null;

  if (!file || !name || !description || !company) {
    return NextResponse.json({ success: false, message: 'All fields are required' });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Gem filen på serveren (du skal opdatere denne del med din eksisterende kode)
  // ...

  // Indsæt metadata i SQLite-databasen via Prisma
  await prisma.upload.create({
    data: {
      fileName: file.name,
      name: name,
      description: description,
      company: company,
    },
  });

  return NextResponse.json({ success: true });
}
