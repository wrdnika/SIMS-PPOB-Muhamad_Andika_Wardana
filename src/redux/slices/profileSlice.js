import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/**
 * Async Thunk untuk mengambil data profil pengguna yang sedang login.
 * Melakukan GET request ke endpoint /profile.
 */
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/profile");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Async Thunk untuk mengambil data saldo pengguna.
 * Melakukan GET request ke endpoint /balance.
 */
export const fetchBalance = createAsyncThunk(
  "profile/fetchBalance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/balance");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Async Thunk untuk memperbarui data profil pengguna (nama depan & belakang).
 * Melakukan PUT request ke endpoint /profile/update.
 * @param {object} profileData - Objek berisi first_name dan last_name.
 */
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.put("/profile/update", profileData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Async Thunk untuk memperbarui foto profil pengguna.
 * Melakukan PUT request ke endpoint /profile/image dengan format multipart/form-data.
 * @param {File} imageFile - File gambar yang akan diunggah.
 */
export const updateProfileImage = createAsyncThunk(
  "profile/updateImage",
  async (imageFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await api.put("/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Update Foto Profil berhasil");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * State awal untuk slice profil.
 */
const initialState = {
  profile: null,
  balance: null,
  isLoading: false,
  error: null,
};

/**
 * Slice Redux yang mengelola semua state yang berhubungan dengan data pengguna,
 * seperti profil dan saldo.
 */
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Menangani state untuk action fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Menangani state untuk action fetchBalance
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload.balance;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Menangani state untuk action updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload; // Perbarui data profil dengan data baru
        alert("Update Pofile berhasil");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Menangani state untuk action updateProfileImage
      .addCase(updateProfileImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Gabungkan data profil yang ada dengan data baru (yang berisi URL gambar baru)
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
