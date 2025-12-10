// app/dashboard/student/job-match-scan/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function JobMatchScanPage() {
  const [user, setUser] = useState<{ package: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('career360_user');
    if (!stored) return router.push('/login');
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return <div>Mohon tunggu...</div>;

  const available = ['Starter', 'Career Booster', 'Career Pro'].includes(user.package);

  if (!available) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Fitur Tidak Tersedia</h2>
          <p className="text-gray-600 mb-6">
            Fitur ini hanya tersedia untuk paket <strong>Starter</strong> ke atas.
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
        <h1 className="text-xl font-bold text-indigo-600">Job-Match Scan</h1>
      </header>
      <main className="p-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Temukan Lowongan yang Cocok</h2>
          <p className="text-gray-600 mb-6">
            Dapatkan rekomendasi lowongan kerja berdasarkan profil, keahlian, dan minat karirmu.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium">Posisi Rekomendasi</h3>
              <p className="text-sm text-gray-500">12 lowongan cocok</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium">Skor Kesesuaian</h3>
              <p className="text-sm text-gray-500">Rata-rata 82%</p>
            </div>
          </div>
          <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
            Lihat Rekomendasi
          </button>
        </div>
      </main>
    </div>
  );
}