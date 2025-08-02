import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Mengambil token dari localStorage saat aplikasi pertama kali dimuat
const token = localStorage.getItem("token");

/**
 * Async Thunk untuk menangani registrasi pengguna.
 * Melakukan POST request ke endpoint /registration.
 */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/registration", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Async Thunk untuk menangani login pengguna.
 * Melakukan POST request ke endpoint /login.
 * Jika berhasil, token akan disimpan di localStorage.
 */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", userData);
      if (response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * State awal untuk slice otentikasi.
 * Memeriksa keberadaan token di localStorage untuk menjaga sesi login.
 */
const initialState = {
  token: token ? token : null,
  isSuccess: false,
  isLoading: false,
  error: null,
};

/**
 * Slice Redux yang mengelola semua state yang berhubungan dengan otentikasi,
 * seperti registrasi, login, dan logout.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Mereset state isSuccess dan error. Berguna setelah notifikasi ditampilkan.
     */
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    },
    /**
     * Menangani proses logout dengan menghapus token dari localStorage dan state.
     */
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Menangani state untuk action registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Menangani state untuk action loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.data.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
