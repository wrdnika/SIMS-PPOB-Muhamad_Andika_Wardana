import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import InputField from "../components/common/InputField";

function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <AuthLayout title="Lengkapi data untuk membuat akun">
      <form onSubmit={handleSubmit}>
        <InputField
          id="email"
          type="email"
          placeholder="masukkan email anda"
          value={form.email}
          onChange={handleChange}
        />
        <InputField
          id="first_name"
          type="text"
          placeholder="nama depan"
          value={form.first_name}
          onChange={handleChange}
        />
        <InputField
          id="last_name"
          type="text"
          placeholder="nama belakang"
          value={form.last_name}
          onChange={handleChange}
        />
        <InputField
          id="password"
          type="password"
          placeholder="buat password"
          value={form.password}
          onChange={handleChange}
        />
        <InputField
          id="confirm_password"
          type="password"
          placeholder="konfirmasi password"
          value={form.confirm_password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white font-bold py-3 rounded-md hover:bg-red-600 transition-colors mt-4"
        >
          Registrasi
        </button>
      </form>
      <p className="text-center mt-8">
        sudah punya akun?{" "}
        <Link to="/login" className="text-red-500 font-bold">
          login di sini
        </Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
