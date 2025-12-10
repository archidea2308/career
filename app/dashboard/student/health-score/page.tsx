// app/dashboard/student/health-score/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HealthScorePage() {
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
          <h2 className="text-xl font-bold text-red-600 mb-4">Career Health Score</h2>
          <p className="text-gray-600 mb-6">
            Skor kesehatan karier bulanan hanya tersedia untuk paket <strong>Career Pro</strong>.
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
        <h1 className="text-xl font-bold text-indigo-600">Career Health Score</h1>
      </header>
      <main className="p-6">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Skor Kesiapan Bulanan</h2>
          <p className="text-gray-600 mb-6">Berdasarkan aktivitas & data terbaru</p>
          
          <div className="relative w-48 h-48 mx-auto">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#eee" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#10B981" strokeWidth="3"
                strokeDasharray="100, 100"
                strokeDashoffset="-87" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-green-600">87</span>
              <span className="text-sm text-gray-500">/100</span>
            </div>
          </div>

          <p className="mt-6 text-gray-700 font-medium">
            💼 Kamu siap 87% untuk dunia kerja!
          </p>
          <p className="text-gray-600 mt-2">
            Rekomendasi: tingkatkan soft skill komunikasi & lengkapi portofolio.
          </p>
        </div>
      </main>
    </div>
  );
}