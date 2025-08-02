import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../redux/slices/authSlice";
import AuthLayout from "../components/layouts/AuthLayout";
import InputField from "../components/common/InputField";

/**
 * Komponen Halaman Registrasi.
 * Menangani pendaftaran pengguna baru, termasuk validasi input,
 * komunikasi dengan API melalui Redux, dan notifikasi hasil.
 */
function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, error } = useSelector((state) => state.auth);

  /**
   * Melakukan validasi pada form registrasi sisi klien.
   * @returns {object} Objek yang berisi pesan error jika ada.
   */
  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Format email tidak valid";
    if (!form.first_name) newErrors.first_name = "Nama depan wajib diisi";
    if (!form.last_name) newErrors.last_name = "Nama belakang wajib diisi";
    if (!form.password) newErrors.password = "Password wajib diisi";
    else if (form.password.length < 8)
      newErrors.password = "Password minimal 8 karakter";
    if (form.password !== form.confirm_password)
      newErrors.confirm_password = "Password tidak cocok";
    return newErrors;
  };

  /**
   * Menangani perubahan pada setiap input field dan memperbarui state form.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event dari input field.
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Menangani submit form, melakukan validasi, dan men-dispatch action registrasi.
   * @param {React.FormEvent<HTMLFormElement>} e - Event dari form.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Hapus confirm_password sebelum mengirim ke API
      const { confirm_password, ...userData } = form;
      dispatch(registerUser(userData));
    }
  };

  /**
   * Effect hook untuk menangani side-effect setelah proses registrasi.
   * Menampilkan notifikasi sukses dan me-redirect ke halaman login.
   */
  useEffect(() => {
    if (isSuccess) {
      alert("Registrasi Berhasil! Silakan login.");
      navigate("/login");
    }
    // Error ditangani oleh notifikasi global di App.jsx
    // Reset state auth setiap kali ada perubahan status
    dispatch(reset());
  }, [isSuccess, navigate, dispatch]);

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
          className="w-full bg-red-500 text-white font-bold py-3 rounded-md hover:bg-red-600 transition-colors mt-4 disabled:bg-red-300"
          disabled={isLoading}
        >
          {isLoading ? "Mendaftar..." : "Registrasi"}
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
