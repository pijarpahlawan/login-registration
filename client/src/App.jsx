import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const hostname = import.meta.env.VITE_HOSTNAME;
  const port = import.meta.env.VITE_PORT;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login
                hostname={hostname}
                port={port}
                setAuth={setIsAuthenticated}
              />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register
                hostname={hostname}
                port={port}
                setAuth={setIsAuthenticated}
              />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard
                hostname={hostname}
                port={port}
                setAuth={setIsAuthenticated}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
          errorElement={<ErrorPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
