import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'File Upload App',
  description: 'An app to upload and view files',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="container">
            <h1>Virksomhedens navn</h1>
            <ul>
              <li><Link href="/upload">Upload Files</Link></li>
              <li><Link href="/uploads">View Uploaded Files</Link></li>
              <li><Link href="/uploads">Log Ud</Link></li>
            </ul>
          </nav>
        </header>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}

