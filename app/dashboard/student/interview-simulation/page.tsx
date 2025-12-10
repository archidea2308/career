// app/dashboard/student/interview-simulation/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InterviewSimulationPage() {
  const [user, setUser] = useState<{ package: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('career360_user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  if (!user) return <div>Loading...</div>;

  // Cek apakah fitur ini tersedia di paket user
  const isAvailable =
    user.package === 'Starter' ||
    user.package === 'Career Booster' ||
    user.package === 'Career Pro';

  if (!isAvailable) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Fitur Tidak Tersedia</h2>
          <p className="text-gray-600 mb-6">
            Fitur Simulasi Interview hanya tersedia untuk paket <strong>Starter</strong>, <strong>Career Booster</strong>, dan <strong>Career Pro</strong>.
          </p>
          <a
            href="/dashboard/student"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Kembali ke Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold text-indigo-600">Simulasi Interview</h1>
      </header>

      <main className="p-6">
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Mulai Simulasi Wawancara</h2>
          <p className="text-gray-600 mb-4">
            Latih kemampuan wawancaramu dengan pertanyaan realistis dari industri.
          </p>
          <button
            onClick={() => alert('Simulasi akan dimulai!')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Mulai Sekarang
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Riwayat Simulasi</h3>
          <p className="text-gray-500">Belum ada riwayat simulasi.</p>
        </div>
      </main>
    </div>
  );
}