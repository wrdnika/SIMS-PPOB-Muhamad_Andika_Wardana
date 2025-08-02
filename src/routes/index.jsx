import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../routes/ProtectedRoute";
import Navbar from "../components/layouts/Navbar";

import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import TopUpPage from "../pages/TopUpPage";

const MainLayout = () => (
  <>
    <Navbar />
    <div className="pt-20">
      <Outlet />
    </div>
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
              {
                path: "",
                element: <HomePage />,
              },
              { path: "topup", element: <TopUpPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
