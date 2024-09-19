// src/app/uploads/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ViewUploadsPage() {
  const [files, setFiles] = useState<{ fileName: string; name: string; description: string; company: string }[]>([]);
  const [selectedFile, setSelectedFile] = useState<{ fileName: string; name: string; description: string; company: string } | null>(null);

  // Fetch the list of files when the component mounts
  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch('/api/files');
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const data = await response.json();
        setFiles(data.files || []);
      } catch (error) {
        console.error('Failed to load files', error);
        setFiles([]);
      }
    }
    fetchFiles();
  }, []);

  return (
    <main>
      <h1>Uploaded Files</h1>
      <div>
        {files.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          <ul>
            {files.map(({ fileName, name, description, company }) => (
              <li key={fileName}>
                <a href="#" onClick={() => setSelectedFile({ fileName, name, description, company })}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedFile && (
        <div>
          <h2>Details for {selectedFile.name}</h2>
          <p><strong>Description:</strong> {selectedFile.description}</p>
          <p><strong>Company:</strong> {selectedFile.company}</p>
          <p>
            <strong>File:</strong> <a href={`/uploads/${selectedFile.fileName}`} target="_blank" rel="noopener noreferrer">{selectedFile.fileName}</a>
          </p>
        </div>
      )}
    </main>
  );
}
