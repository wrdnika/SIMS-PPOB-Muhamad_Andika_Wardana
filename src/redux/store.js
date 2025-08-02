import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import servicesReducer from "./slices/servicesSlice";
import bannerReducer from "./slices/bannerSlice";
import transactionReducer from "./slices/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    services: servicesReducer,
    banners: bannerReducer,
    transaction: transactionReducer,
  },
});
