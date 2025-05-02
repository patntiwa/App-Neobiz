// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPages';
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardHome from './pages/Dashboard/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ThemeToggle from './components/ui/ThemeToggle';

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? <DashboardLayout /> : <Navigate to="/login" />
          }
        >
          <Route index element={<DashboardHome />} />
        </Route>
      </Routes>

      <ThemeToggle />
    </>
  );
}

export default App;
