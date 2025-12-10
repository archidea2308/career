// app/dashboard/student/cv-optimization/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CvOptimizationPage() {
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
        <h1 className="text-xl font-bold text-indigo-600">Optimasi CV</h1>
      </header>
      <main className="p-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Periksa & Tingkatkan CV-mu</h2>
          <p className="text-gray-600 mb-6">
            Unggah CV-mu dan dapatkan analisis AI untuk meningkatkan kualitasnya agar sesuai standar industri.
          </p>
          <button
            onClick={() => alert('Fitur upload CV akan segera hadir!')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Unggah CV
          </button>
        </div>
      </main>
    </div>
  );
}