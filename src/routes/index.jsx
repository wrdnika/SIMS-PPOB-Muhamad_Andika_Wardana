import React, { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../routes/ProtectedRoute";
import Navbar from "../components/layouts/Navbar";

// impor halaman dinamis dengan lazy()
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const TopUpPage = lazy(() => import("../pages/TopUpPage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage"));
const TransactionHistoryPage = lazy(() =>
  import("../pages/TransactionHistoryPage")
);
const ProfilePage = lazy(() => import("../pages/ProfilePage"));

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { path: "", element: <HomePage /> },
              { path: "topup", element: <TopUpPage /> },
              { path: "payment", element: <PaymentPage /> },
              { path: "transaction", element: <TransactionHistoryPage /> },
              { path: "akun", element: <ProfilePage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
