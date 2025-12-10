// app/dashboard/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [user, setUser] = useState<{ role: string; name: string } | null>(null);
  const [studentCount, setStudentCount] = useState(127);
  const [averageReadiness, setAverageReadiness] = useState(72);
  const [starterCount, setStarterCount] = useState(68);
  const [boosterCount, setBoosterCount] = useState(45);
  const [proCount, setProCount] = useState(14);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('career360_user');
    if (!stored) {
      router.push('/login');
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.role !== 'admin') {
      // Redirect jika bukan admin
      router.push('/dashboard/student');
      return;
    }
    setUser(parsed);
  }, [router]);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">Dashboard Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Halo, {user.name}</span>
          <Link href="/" className="text-red-500 text-sm">Logout</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Ringkasan Sekolah</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-500 text-sm">Total Siswa Terdaftar</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{studentCount}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-500 text-sm">Rata-rata Skor Kesiapan</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{averageReadiness}/100</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-500 text-sm">Paket Starter</h3>
            <p className="text-3xl font-bold text-gray-700 mt-2">{starterCount}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-500 text-sm">Paket Premium (Booster + Pro)</h3>
            <p className="text-3xl font-bold text-indigo-700 mt-2">{boosterCount + proCount}</p>
          </div>
        </div>

        {/* Package Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h3 className="font-semibold text-lg mb-4">Distribusi Paket Langganan</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Starter (Rp15.900/siswa/tahun)</span>
                <span>{starterCount} siswa</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-500 h-2 rounded-full"
                  style={{ width: `${(starterCount / studentCount) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Career Booster (Rp39.900)</span>
                <span>{boosterCount} siswa</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${(boosterCount / studentCount) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Career Pro (Rp99.000)</span>
                <span>{proCount} siswa</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${(proCount / studentCount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-4">Aksi Cepat</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="#"
              className="p-4 border border-gray-300 rounded-lg text-center hover:bg-gray-50 text-indigo-600"
              onClick={(e) => {
                e.preventDefault();
                alert('Fitur manajemen siswa akan dikembangkan di versi berikutnya.');
              }}
            >
              Kelola Siswa
            </Link>
            <Link
              href="#"
              className="p-4 border border-gray-300 rounded-lg text-center hover:bg-gray-50 text-indigo-600"
              onClick={(e) => {
                e.preventDefault();
                alert('Fitur unggah data batch siswa akan datang segera.');
              }}
            >
              Impor Data Siswa
            </Link>
            <Link
              href="#"
              className="p-4 border border-gray-300 rounded-lg text-center hover:bg-gray-50 text-indigo-600"
              onClick={(e) => {
                e.preventDefault();
                alert('Laporan statistik akan tersedia dalam format PDF/Excel.');
              }}
            >
              Unduh Laporan
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}