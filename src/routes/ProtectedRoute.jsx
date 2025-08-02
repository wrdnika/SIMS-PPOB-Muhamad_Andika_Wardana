import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Komponen "penjaga gerbang" untuk rute yang memerlukan otentikasi.
 * Memeriksa keberadaan token di state Redux. Jika tidak ada, pengguna akan
 * diarahkan ke halaman login. Jika ada, komponen ini akan merender
 * rute anak (child route) yang diproteksi.
 */
const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);

  // Jika tidak ada token, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada token, izinkan akses ke rute selanjutnya (yang berisi MainLayout dan halamannya)
  return <Outlet />;
};

export default ProtectedRoute;
