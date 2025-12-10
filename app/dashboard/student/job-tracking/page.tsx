// app/dashboard/student/job-tracking/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function JobTrackingPage() {
  const [user, setUser] = useState<{ package: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('career360_user');
    if (!stored) return router.push('/login');
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return <div>Mohon tunggu...</div>;

  const available = user.package === 'Career Pro';

  if (!available) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Fitur Eksklusif Career Pro</h2>
          <p className="text-gray-600 mb-6">
            Dashboard pelacak lamaran hanya tersedia untuk paket <strong>Career Pro</strong>.
          </p>
          <Link href="/dashboard/student" className="text-indigo-600 hover:underline">
            ← Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold text-indigo-600">Pelacak Lamaran Kerja</h1>
      </header>
      <main className="p-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Status Lamaranmu</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg flex justify-between">
              <span>PT Teknologi Nusantara</span>
              <span className="text-yellow-600 font-medium">Menunggu</span>
            </div>
            <div className="p-4 border rounded-lg flex justify-between">
              <span>CV Digital Solusi</span>
              <span className="text-green-600 font-medium">Diterima Interview</span>
            </div>
            <div className="p-4 border rounded-lg flex justify-between">
              <span>Startup XYZ</span>
              <span className="text-red-600 font-medium">Ditolak</span>
            </div>
          </div>
          <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
            + Tambah Lamaran
          </button>
        </div>
      </main>
    </div>
  );
}