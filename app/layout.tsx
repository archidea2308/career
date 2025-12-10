// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CareerReady360',
  description: 'Platform kesiapan karier siswa SMK',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}