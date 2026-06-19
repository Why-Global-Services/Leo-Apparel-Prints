// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import Sidebar from './pages/Sidebar';
import AdminLayout from './components/layout/AdminLayout';
import Categorypage from './pages/Categorypage';
import Designzonepage from './pages/Designzonepage';
import Templatepage from './pages/Templatepage';
import ProductPage from './pages/Productpage';
import Createpattern from './pages/Createpattern';
import Customizationlist from './pages/Customizationlist';
import Orderspage from './pages/Orderspage';
import Dashboardpage from './pages/Dashboardpage';
import BulkEnquiriesPage from './pages/BulkEnquiriesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BannerPage from './pages/BannerPage';

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        style={{ zIndex: 99999 }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/category" />} />
          <Route path="category" element={<Categorypage />} />
          <Route path="designzone" element={<Designzonepage />} />
          <Route path="templatezone" element={<Templatepage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="pattern" element={<Createpattern />} />
          <Route path="customize" element={<Customizationlist />} />
          <Route path="orderspage" element={<Orderspage />} />
          <Route path="dashboard" element={<Dashboardpage />} />
          <Route path="bulkenquiries" element={<BulkEnquiriesPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="banners" element={<BannerPage />} />
          <Route path="users" element={<div style={{ padding: '24px', color: 'white' }}>Users Page</div>} />
          <Route path="orders" element={<div style={{ padding: '24px', color: 'white' }}>Orders Page</div>} />
          <Route path="settings" element={<div style={{ padding: '24px', color: 'white' }}>Settings Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;