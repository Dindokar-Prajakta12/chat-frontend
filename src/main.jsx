

import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // ✅ Import Auth Context
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; // if you have global Tailwind styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 🔐 Provide authentication state to the entire app */}
    <AuthProvider>
      <AppRouter />
      {/* 🔔 Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  </React.StrictMode>
);
