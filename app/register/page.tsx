// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'admin' | 'industry'>('student');
  const [school, setSchool] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<'Starter' | 'Career Booster' | 'Career Pro'>('Starter');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulasi pendaftaran
    console.log('Registrasi:', { name, email, role, school, selectedPackage });

    // Simpan data ke localStorage
    localStorage.setItem('career360_user', JSON.stringify({
      name,
      email,
      role,
      school: role === 'industry' ? undefined : school,
      package: selectedPackage, // simpan paket yang dipilih
    }));

    // Arahkan ke dashboard sesuai peran
    if (role === 'student') {
      router.push('/dashboard/student');
    } else if (role === 'admin') {
      router.push('/dashboard/admin');
    } else {
      router.push('/dashboard/industry');
    }
  };

  // Hanya tampilkan paket jika peran = student
  const showPackageSelection = role === 'student';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Buat Akun Baru
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Nama */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Kata Sandi
            </label>
            <input
              id="password"
              type="password"
              minLength={6}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Peran */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Saya adalah...
            </label>
            <select
              id="role"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="student">Siswa SMK</option>
              <option value="admin">Admin Sekolah</option>
              <option value="industry">Perwakilan Industri</option>
            </select>
          </div>

          {/* Sekolah (jika bukan industri) */}
          {(role === 'student' || role === 'admin') && (
            <div>
              <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Sekolah/Instansi
              </label>
              <input
                id="school"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Contoh: SMK Negeri 1 Jakarta"
                required
              />
            </div>
          )}

          {/* Pilihan Paket (hanya untuk siswa) */}
          {showPackageSelection && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Pilih Paket Langganan</h3>
              <p className="text-sm text-gray-600 mb-6">Untuk siswa dan alumni yang ingin meningkatkan daya saing di dunia kerja</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Starter */}
                <div
                  className={`border rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPackage === 'Starter'
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPackage('Starter')}
                >
                  <h4 className="font-bold text-lg">Starter</h4>
                  <div className="text-2xl font-bold text-gray-900 mt-2">Rp15.900<span className="text-sm font-normal">/siswa/tahun</span></div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>✓ 1x Career Profiling Premium</li>
                    <li>✓ 1x Simulasi Interview</li>
                    <li>✓ 3x CV Check AI</li>
                    <li>✓ 1x Job-Match Scan</li>
                    <li>✓ 1x Konsultasi Karir Lite</li>
                  </ul>
                  <button
                    type="button"
                    className={`w-full mt-6 py-2 rounded-md text-sm font-medium ${
                      selectedPackage === 'Starter'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPackage('Starter');
                    }}
                  >
                    Pilih Paket
                  </button>
                </div>

                {/* Career Booster */}
                <div
                  className={`border rounded-xl p-6 cursor-pointer transition-all relative ${
                    selectedPackage === 'Career Booster'
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPackage('Career Booster')}
                >
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                    Paling Populer
                  </div>
                  <h4 className="font-bold text-lg text-indigo-600">Career Booster</h4>
                  <div className="text-2xl font-bold text-indigo-600 mt-2">Rp39.900<span className="text-sm font-normal">/siswa/tahun</span></div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>✓ 2x Simulasi Interview</li>
                    <li>✓ 6x CV Optimization</li>
                    <li>✓ 5x Job-Match Scan</li>
                    <li>✓ 2x Career Counseling</li>
                    <li>✓ 1x Portfolio Review</li>
                    <li>✓ Akses Talent Academy</li>
                  </ul>
                  <button
                    type="button"
                    className={`w-full mt-6 py-2 rounded-md text-sm font-medium ${
                      selectedPackage === 'Career Booster'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPackage('Career Booster');
                    }}
                  >
                    Pilih Paket
                  </button>
                </div>

                {/* Career Pro */}
                <div
                  className={`border rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPackage === 'Career Pro'
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPackage('Career Pro')}
                >
                  <h4 className="font-bold text-lg">Career Pro</h4>
                  <div className="text-2xl font-bold text-gray-900 mt-2">Rp99.000<span className="text-sm font-normal">/siswa/tahun</span></div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>✓ Interview Simulation Unlimited</li>
                    <li>✓ CV Analysis Unlimited</li>
                    <li>✓ Portfolio Optimization</li>
                    <li>✓ Job Tracking Dashboard</li>
                    <li>✓ Sertifikasi Internal (token-based)</li>
                    <li>✓ Career Health Score Bulanan</li>
                    <li>✓ Premium Badge (terlihat industri)</li>
                  </ul>
                  <button
                    type="button"
                    className={`w-full mt-6 py-2 rounded-md text-sm font-medium ${
                      selectedPackage === 'Career Pro'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPackage('Career Pro');
                    }}
                  >
                    Pilih Paket
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition mt-8"
          >
            Daftar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  );
}