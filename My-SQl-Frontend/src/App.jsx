import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Login from './PAGES/Login';
import Layout from './PAGES/Layout';
import DashboardRoutes from './Routes/DashboardRoute';
import Register from './PAGES/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {DashboardRoutes}
        </Route>

        {/* Optional: Catch-all for unmatched routes */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
