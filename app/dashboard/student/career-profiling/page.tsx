// app/dashboard/student/career-profiling/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CareerProfilingPage() {
  const [user, setUser] = useState<{ package: string; name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('career360_user');
    if (!stored) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;

  // Semua paket (Starter, Booster, Pro) memiliki akses ke Career Profiling
  const available = ['Starter', 'Career Booster', 'Career Pro'].includes(user.package);

  if (!available) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Fitur Tidak Tersedia</h2>
          <p className="text-gray-600 mb-6">
            Career Profiling Premium hanya tersedia untuk pelanggan CareerReady360.
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
      {/* Header */}
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold text-indigo-600">Career Profiling Premium</h1>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Profil Karier Personal untuk {user.name}</h2>
          <p className="text-gray-600 mb-6">
            Analisis mendalam berdasarkan minat, keahlian, pengalaman, dan capaian akademikmu.
            Rekomendasi jalur karier disusun menggunakan data dari dunia industri nyata.
          </p>

          {/* Profil Ringkasan */}
          <div className="border rounded-lg p-5 mb-6 bg-indigo-50">
            <h3 className="font-bold text-indigo-800 mb-2">Ringkasan Profil</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Jalur Karier Direkomendasikan:</strong> Pengembang Perangkat Lunak</li>
              <li><strong>Kesesuaian:</strong> Sangat Cocok (92%)</li>
              <li><strong>Industri Target:</strong> Teknologi Informasi, Startup Digital</li>
              <li><strong>Kelebihan Utama:</strong> Problem Solving, Coding, Portofolio Proyek</li>
            </ul>
          </div>

          {/* Rekomendasi Tambahan */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Langkah Selanjutnya</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg">
                <h4 className="font-medium">🔍 Perdalam Skill</h4>
                <p className="text-sm text-gray-600">Pelajari React.js & API Integration</p>
              </div>
              <div className="border p-4 rounded-lg">
                <h4 className="font-medium">💼 Coba Magang</h4>
                <p className="text-sm text-gray-600">Startup teknologi lokal (durasi 1-3 bulan)</p>
              </div>
              <div className="border p-4 rounded-lg">
                <h4 className="font-medium">📄 Perbarui CV</h4>
                <p className="text-sm text-gray-600">Sesuaikan dengan jalur developer</p>
              </div>
              <div className="border p-4 rounded-lg">
                <h4 className="font-medium">🎯 Ikuti Simulasi Interview</h4>
                <p className="text-sm text-gray-600">Latih jawaban teknis & perilaku</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={() => alert('Laporan lengkap PDF akan diunduh')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Unduh Laporan Profil Lengkap (PDF)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}