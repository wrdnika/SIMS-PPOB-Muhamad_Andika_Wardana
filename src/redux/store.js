import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import servicesReducer from "./slices/servicesSlice";
import bannerReducer from "./slices/bannerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    services: servicesReducer,
    banners: bannerReducer,
  },
});
