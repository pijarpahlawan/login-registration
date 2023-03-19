import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setIsAuthenticated} />
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
              <Register setAuth={setIsAuthenticated} />
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
              <Dashboard setAuth={setIsAuthenticated} />
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
