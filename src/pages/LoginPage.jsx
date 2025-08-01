import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../redux/slices/authSlice";
import AuthLayout from "../components/layouts/AuthLayout";
import InputField from "../components/common/InputField";

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

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email wajib diisi";
    if (!form.password) newErrors.password = "Password wajib diisi";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(loginUser(form));
    }
  };

  useEffect(() => {
    if (isSuccess && token) {
      navigate("/");
    }

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
