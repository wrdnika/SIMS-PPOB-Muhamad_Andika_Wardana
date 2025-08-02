import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import servicesReducer from "./slices/servicesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    services: servicesReducer,
  },
});
