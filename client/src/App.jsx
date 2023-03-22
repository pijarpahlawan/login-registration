import { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const hostname = import.meta.env.VITE_HOSTNAME;
  const port = import.meta.env.VITE_PORT;

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated = async () => {
    try {
      const response = await fetch(
        `http://${hostname}:${port}/auth/is-verify`,
        {
          method: 'GET',
          headers: {
            token: localStorage.token,
          },
        },
      );

      const parsedRes = await response.json();
      parsedRes.isAuthorize ? setAuth(true) : setAuth(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register hostname={hostname} port={port} setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login hostname={hostname} port={port} setAuth={setAuth} />
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
              <Dashboard hostname={hostname} port={port} setAuth={setAuth} />
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
