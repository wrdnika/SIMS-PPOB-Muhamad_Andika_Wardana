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

const initialState = {
  isLoading: false,
  isSuccess: false,
  error: null,
  message: "",
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
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { resetTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
