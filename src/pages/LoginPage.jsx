import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../redux/slices/authSlice";
import AuthLayout from "../components/layouts/AuthLayout";
import InputField from "../components/common/InputField";

/**
 * Komponen Halaman Login.
 * Bertanggung jawab untuk menangani input pengguna, validasi,
 * otentikasi melalui Redux, dan navigasi setelah login berhasil.
 */
function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, isLoading, isSuccess, error } = useSelector(
    (state) => state.auth
  );

  /**
   * Melakukan validasi pada form login sisi klien.
   * @returns {object} Objek yang berisi pesan error kalo ada error.
   */
  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email wajib diisi";
    if (!form.password) newErrors.password = "Password wajib diisi";
    return newErrors;
  };

  /**
   * Menangani perubahan ke setiap input field dan memperbarui state form.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event dari input field.
   */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Menangani submit form, melakukan validasi, dan men-dispatch action login.
   * @param {React.FormEvent<HTMLFormElement>} e - Event dari form.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(loginUser(form));
    }
  };

  /**
   * Effect hook untuk menangani side-effect setelah proses login selesai.
   * Akan me-redirect pengguna ke halaman utama jika login berhasil.
   */
  useEffect(() => {
    // Redirect saat login berhasil dan token diterima
    if (isSuccess && token) {
      navigate("/");
    }

    // Reset state auth (isLoading, isSuccess, error)
    // Dijalankan setiap kali dependensi berubah untuk membersihkan state
    dispatch(reset());
  }, [token, isSuccess, navigate, dispatch]);

  return (
    <AuthLayout title="Masuk atau buat akun untuk memulai">
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
          id="password"
          type="password"
          placeholder="masukkan password anda"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white font-bold py-3 rounded-md hover:bg-red-600 transition-colors mt-4 disabled:bg-red-300"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Masuk"}
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
