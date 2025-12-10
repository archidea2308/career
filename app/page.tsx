// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">CareerReady360</h1>
        <div>
          <Link href="/login" className="text-indigo-600 mr-4">Login</Link>
          <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md">Daftar</Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-12 bg-gradient-to-br from-indigo-50 to-white">
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">
          Siap Karier Sejak SMK
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          Platform pelacakan kesiapan kerja siswa dengan portofolio digital, skor kesiapan, dan talent pool untuk industri.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/register" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700">
            Mulai Sekarang
          </Link>
          <Link href="/login" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50">
            Demo
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CareerReady360 – Untuk SMK Indonesia
      </footer>
    </div>
  );
}