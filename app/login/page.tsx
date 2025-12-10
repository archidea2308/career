// app/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'admin' | 'industry'>('student');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi login
    localStorage.setItem('career360_user', JSON.stringify({ email, role }));
    if (role === 'student') router.push('/dashboard/student');
    else if (role === 'admin') router.push('/dashboard/admin');
    else router.push('/dashboard/industry');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Peran</label>
            <select
              className="w-full p-2 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="student">Siswa</option>
              <option value="admin">Admin Sekolah</option>
              <option value="industry">Industri</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}