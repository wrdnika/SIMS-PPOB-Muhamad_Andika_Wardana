import axios from "axios";

/**
 * Konfigurasi instance Axios terpusat untuk semua panggilan API.
 * - Menambahkan interceptor untuk menyertakan token otentikasi secara otomatis
 * pada setiap request yang memerlukan login.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Menambahkan request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
