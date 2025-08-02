import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/**
 * Async Thunk untuk menangani proses Top Up saldo.
 * Melakukan POST request ke endpoint /topup.
 * @param {object} topUpData - Objek berisi { top_up_amount: number }.
 */
export const topUpBalance = createAsyncThunk(
  "transaction/topUp",
  async (topUpData, { rejectWithValue }) => {
    try {
      const response = await api.post("/topup", topUpData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Async Thunk untuk menangani proses pembayaran layanan.
 * Melakukan POST request ke endpoint /transaction.
 * @param {object} paymentData - Objek berisi { service_code: string }.
 */
export const createPayment = createAsyncThunk(
  "transaction/payment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await api.post("/transaction", paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Async Thunk untuk mengambil riwayat transaksi dengan pagination.
 * Melakukan GET request ke endpoint /transaction/history.
 * @param {{offset: number, limit: number}} pagination - Objek berisi offset dan limit.
 */
export const fetchHistory = createAsyncThunk(
  "transaction/history",
  async ({ offset = 0, limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/transaction/history?offset=${offset}&limit=${limit}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * State awal untuk slice transaksi.
 */
const initialState = {
  isLoading: false,
  isSuccess: false,
  error: null,
  message: "",
  history: [],
  offset: 0,
  hasMore: true, // Flag untuk menandakan jika masih ada data riwayat untuk dimuat
};

/**
 * Slice Redux yang mengelola semua state yang berhubungan dengan transaksi,
 * seperti Top Up, Pembayaran, dan Riwayat Transaksi.
 */
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    /**
     * Mereset state transaksi (isLoading, isSuccess, error, message) ke kondisi awal.
     * Berguna setelah notifikasi ditampilkan.
     */
    resetTransaction: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
      state.message = "";
    },
    /**
     * Membersihkan data riwayat transaksi dan mereset pagination.
     * Berguna saat pengguna meninggalkan halaman riwayat.
     */
    clearHistory: (state) => {
      state.history = [];
      state.offset = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Menangani state untuk action topUpBalance
      .addCase(topUpBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(topUpBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(topUpBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Menangani state untuk action createPayment
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Menangani state untuk action fetchHistory
      .addCase(fetchHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        // Tambahkan data baru ke array history yang sudah ada
        state.history = [...state.history, ...action.payload.records];
        // Perbarui offset untuk panggilan selanjutnya
        state.offset = state.offset + action.payload.records.length;
        // Jika data yang diterima lebih sedikit dari limit, berarti data sudah habis
        if (action.payload.records.length < 5) {
          state.hasMore = false;
        }
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTransaction, clearHistory } = transactionSlice.actions;
export default transactionSlice.reducer;
