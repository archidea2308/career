// app/dashboard/student/certification/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CertificationPage() {
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
          <h2 className="text-xl font-bold text-red-600 mb-4">Sertifikasi Internal</h2>
          <p className="text-gray-600 mb-6">
            Fitur ini eksklusif untuk paket <strong>Career Pro</strong>.
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
        <h1 className="text-xl font-bold text-indigo-600">Sertifikasi Internal</h1>
      </header>
      <main className="p-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Dapatkan Sertifikat Kesiapan Kerja</h2>
          <p className="text-gray-600 mb-6">
            Ikuti penilaian dan dapatkan sertifikat resmi dari CareerReady360 yang terverifikasi industri.
          </p>
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <p className="text-gray-500">Sertifikat akan muncul di sini setelah kamu menyelesaikan penilaian</p>
          </div>
          <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
            Mulai Penilaian
          </button>
        </div>
      </main>
    </div>
  );
}