import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import InputField from "../components/common/InputField";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", form);
  };

  return (
    <AuthLayout title="Masuk atau buat akun untuk memulai">
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          id="email"
          type="email"
          placeholder="masukkan email anda"
          value={form.email}
          onChange={handleChange}
        />
        <InputField
          id="password"
          type="password"
          placeholder="masukkan password anda"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white font-bold py-3 rounded-md hover:bg-red-600 transition-colors mt-4"
        >
          Masuk
        </button>
      </form>
      <p className="text-center mt-8">
        belum punya akun?{" "}
        <Link to="/register" className="text-red-500 font-bold">
          registrasi di sini
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
