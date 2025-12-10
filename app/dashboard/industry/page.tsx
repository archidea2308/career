// app/dashboard/industry/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function IndustryDashboard() {
  const [user, setUser] = useState<{ role: string; name: string } | null>(null);
  const [students, setStudents] = useState([
    { id: 1, name: 'Budi Santoso', school: 'SMK Negeri 1 Jakarta', readiness: 89, package: 'Career Pro', skills: ['Web Dev', 'UI/UX'], portfolio: '#' },
    { id: 2, name: 'Siti Aminah', school: 'SMK Teknologi Bandung', readiness: 82, package: 'Career Pro', skills: ['Digital Marketing', 'Content Creation'], portfolio: '#' },
    { id: 3, name: 'Ahmad Rizki', school: 'SMK Informatika Surabaya', readiness: 76, package: 'Career Booster', skills: ['Networking', 'Hardware'], portfolio: '#' },
    { id: 4, name: 'Dewi Lestari', school: 'SMK Negeri 5 Yogyakarta', readiness: 71, package: 'Career Booster', skills: ['Accounting', 'Excel'], portfolio: '#' },
  ]);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('career360_user');
    if (!stored) {
      router.push('/login');
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.role !== 'industry') {
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
        <h1 className="text-xl font-bold text-indigo-600">Dashboard Industri</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Halo, {user.name}</span>
          <Link href="/" className="text-red-500 text-sm">Logout</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Talent Pool Siswa Siap Kerja</h2>
          <p className="text-gray-600">
            Temukan siswa SMK terbaik berdasarkan skor kesiapan, keahlian, dan portofolio digital mereka.
          </p>
        </div>

        {/* Filter (Opsional untuk demo) */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Minimal Skor Kesiapan</label>
              <input
                type="range"
                min="50"
                max="100"
                defaultValue="70"
                className="w-full"
                onChange={(e) => console.log('Filter skor:', e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Paket Langganan</label>
              <select className="w-full p-2 border rounded">
                <option>Semua Paket</option>
                <option>Career Booster</option>
                <option>Career Pro</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>

        {/* Talent List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4 font-medium">Nama Siswa</th>
                <th className="p-4 font-medium">Sekolah</th>
                <th className="p-4 font-medium">Skor Kesiapan</th>
                <th className="p-4 font-medium">Keahlian</th>
                <th className="p-4 font-medium">Portofolio</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4 text-gray-600">{student.school}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="font-bold text-green-600 mr-2">{student.readiness}</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${student.readiness}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {student.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <a
                      href={student.portfolio}
                      className="text-indigo-600 hover:underline text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Portofolio ${student.name} akan dibuka di versi lengkap.`);
                      }}
                    >
                      Lihat →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <h3 className="font-bold text-blue-800 text-lg">Ingin mengakses talent pool lengkap?</h3>
          <p className="text-blue-700 mt-2 mb-4">
            Hubungi tim CareerReady360 untuk verifikasi akun industri dan akses prioritas.
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => alert('Fitur kontak tim sedang dalam pengembangan.')}
          >
            Ajukan Verifikasi
          </button>
        </div>
      </main>
    </div>
  );
}