import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

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

const initialState = {
  isLoading: false,
  isSuccess: false,
  error: null,
  message: "",
  history: [],
  offset: 0,
  hasMore: true,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetTransaction: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
      state.message = "";
    },
    clearHistory: (state) => {
      state.history = [];
      state.offset = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // case untuk topup
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
      //   case untuk pembayaran
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
      //   case untuk histori
      .addCase(fetchHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.history = [...state.history, ...action.payload.records];
        state.offset = state.offset + action.payload.records.length;
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
