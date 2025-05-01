// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPages';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/Dashboard/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
      </Route>
    </Routes>
  );
}
export default App;