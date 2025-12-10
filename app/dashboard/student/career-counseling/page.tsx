// app/dashboard/student/career-counseling/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CareerCounselingPage() {
  const [user, setUser] = useState<{ package: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('career360_user');
    if (!stored) return router.push('/login');
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return <div>Mohon tunggu...</div>;

  const available = user.package !== 'Starter' || user.package === 'Starter';
  // Semua paket punya akses dasar

  if (!available) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Fitur Tidak Tersedia</h2>
          <p className="text-gray-600 mb-6">
            Konsultasi karir tersedia mulai dari paket <strong>Starter</strong>.
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
        <h1 className="text-xl font-bold text-indigo-600">Konsultasi Karir</h1>
      </header>
      <main className="p-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Jadwalkan Konsultasi dengan Mentor</h2>
          <p className="text-gray-600 mb-6">
            Bicarakan rencana karier, jurusan kuliah, atau strategi melamar kerja dengan mentor profesional.
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <span>Konsultasi #1 – 15 Mei 2025</span>
              <span className="text-green-600 font-medium">Selesai</span>
            </div>
            <button className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
              Jadwalkan Baru
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}