// app/dashboard/student/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    package: 'Starter' | 'Career Booster' | 'Career Pro';
  } | null>(null);

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

  // Daftar fitur per paket
  const features = {
    Starter: [
      { name: 'Career Profiling Premium', path: '/dashboard/student/career-profiling', enabled: true },
      { name: 'Simulasi Interview', path: '/dashboard/student/interview-simulation', enabled: true },
      { name: 'CV Check AI', path: '/dashboard/student/cv-optimization', enabled: true },
      { name: 'Job-Match Scan', path: '/dashboard/student/job-match-scan', enabled: true },
      { name: 'Konsultasi Karir Lite', path: '/dashboard/student/career-counseling', enabled: true },
    ],
    'Career Booster': [
      { name: 'Career Profiling Premium', path: '/dashboard/student/career-profiling', enabled: true },
      { name: 'Simulasi Interview (2x)', path: '/dashboard/student/interview-simulation', enabled: true },
      { name: 'CV Optimization (6x)', path: '/dashboard/student/cv-optimization', enabled: true },
      { name: 'Job-Match Scan (5x)', path: '/dashboard/student/job-match-scan', enabled: true },
      { name: 'Career Counseling (2x)', path: '/dashboard/student/career-counseling', enabled: true },
      { name: 'Portfolio Review', path: '/dashboard/student/portfolio-review', enabled: true },
      { name: 'Talent Academy', path: '/dashboard/student/talent-academy', enabled: true },
    ],
    'Career Pro': [
      { name: 'Career Profiling Premium', path: '/dashboard/student/career-profiling', enabled: true },
      { name: 'Interview Simulation Unlimited', path: '/dashboard/student/interview-simulation', enabled: true },
      { name: 'CV Analysis Unlimited', path: '/dashboard/student/cv-optimization', enabled: true },
      { name: 'Job-Match Scan Unlimited', path: '/dashboard/student/job-match-scan', enabled: true },
      { name: 'Career Counseling Unlimited', path: '/dashboard/student/career-counseling', enabled: true },
      { name: 'Portfolio Optimization', path: '/dashboard/student/portfolio-review', enabled: true },
      { name: 'Talent Academy', path: '/dashboard/student/talent-academy', enabled: true },
      { name: 'Job Tracking Dashboard', path: '/dashboard/student/job-tracking', enabled: true },
      { name: 'Sertifikasi Internal', path: '/dashboard/student/certification', enabled: true },
      { name: 'Career Health Score Bulanan', path: '/dashboard/student/health-score', enabled: true },
      { name: 'Premium Badge (terlihat industri)', path: '/dashboard/student/health-score', enabled: true },
    ],
  };

  const currentFeatures = features[user.package];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">Dashboard Siswa</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Paket: <strong>{user.package}</strong></span>
          <Link href="/" className="text-red-500">Logout</Link>
        </div>
      </header>

      <main className="p-6">
        {/* Welcome */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-2">Halo, {user.name}!</h2>
          <p className="text-gray-600">Selamat datang di CareerReady360. Berikut fitur yang tersedia untuk paketmu:</p>
        </div>

        {/* Fitur Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentFeatures.map((feature, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl border ${
                feature.enabled
                  ? 'border-indigo-200 bg-white hover:bg-indigo-50 cursor-pointer'
                  : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-70'
              }`}
            >
              <h3 className="font-medium text-lg">{feature.name}</h3>
              {feature.enabled ? (
                <Link
                  href={feature.path}
                  className="mt-3 inline-block text-indigo-600 hover:underline"
                >
                  Buka Fitur →
                </Link>
              ) : (
                <span className="mt-3 inline-block text-gray-500">Fitur tidak tersedia</span>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}