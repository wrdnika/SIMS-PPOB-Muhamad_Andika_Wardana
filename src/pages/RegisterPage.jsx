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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validasi Email
    if (!form.email) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Format email tidak valid";

    // Validasi Nama Depan
    if (!form.first_name) newErrors.first_name = "Nama depan wajib diisi";

    // Validasi Nama Belakang
    if (!form.last_name) newErrors.last_name = "Nama belakang wajib diisi";

    // Validasi Password
    if (!form.password) newErrors.password = "Password wajib diisi";
    else if (form.password.length < 8)
      newErrors.password = "Password minimal 8 karakter";

    // Validasi Konfirmasi Password
    if (!form.confirm_password)
      newErrors.confirm_password = "Konfirmasi password wajib diisi";
    else if (form.password !== form.confirm_password)
      newErrors.confirm_password = "Password tidak cocok";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form valid, siap dikirim ke API:", form);
    } else {
      console.log("Form tidak valid:", validationErrors);
    }
  };

  return (
    <AuthLayout title="Lengkapi data untuk membuat akun">
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          id="email"
          type="email"
          placeholder="masukkan email anda"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          id="first_name"
          type="text"
          placeholder="nama depan"
          value={form.first_name}
          onChange={handleChange}
          error={errors.first_name}
        />
        <InputField
          id="last_name"
          type="text"
          placeholder="nama belakang"
          value={form.last_name}
          onChange={handleChange}
          error={errors.last_name}
        />
        <InputField
          id="password"
          type="password"
          placeholder="buat password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <InputField
          id="confirm_password"
          type="password"
          placeholder="konfirmasi password"
          value={form.confirm_password}
          onChange={handleChange}
          error={errors.confirm_password}
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
