import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center font-bold text-lg">
            Loading...
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
