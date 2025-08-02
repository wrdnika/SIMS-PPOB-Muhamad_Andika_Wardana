import React, { memo } from "react";

/**
 * Komponen layout dua kolom untuk halaman otentikasi (Login & Registrasi).
 * Dioptimalkan dengan React.memo untuk mencegah re-render yang tidak perlu.
 * @param {object} props - Props untuk komponen AuthLayout.
 * @param {string} props.title - Judul yang akan ditampilkan di atas form.
 * @param {React.ReactNode} props.children - Konten form yang akan dirender (misalnya, input fields dan tombol).
 */
const AuthLayout = ({ title, children }) => {
  return (
    <div className="flex h-screen">
      {/* Kolom Kiri - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <img
              src="/Logo.png"
              alt="SIMS PPOB Logo"
              className="h-12 w-12 mr-3"
            />
            <h1 className="text-2xl font-bold">SIMS PPOB</h1>
          </div>
          <h2 className="text-3xl font-semibold mb-8 text-center">{title}</h2>
          {children}
        </div>
      </div>

      {/* Kolom Kanan */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50">
        <img
          src="/assets/auth/IllustrasiAuth.png"
          alt="Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default memo(AuthLayout);
