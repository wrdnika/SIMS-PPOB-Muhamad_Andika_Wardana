import React from "react";
import SIMSLogo from "/Logo.png";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="flex h-screen">
      {/* Kolom Kiri - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <img
              src={SIMSLogo}
              alt="SIMS PPOB Logo"
              className="h-12 w-12 mr-3"
            />
            <h1 className="text-2xl font-bold">SIMS PPOB</h1>
          </div>
          <h2 className="text-3xl font-semibold mb-8 text-center">{title}</h2>
          {children}
        </div>
      </div>

      {/* Kolom Kanan - Ilustrasi (SUDAH DIPERBAIKI) */}
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

export default AuthLayout;
