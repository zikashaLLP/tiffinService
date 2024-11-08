// // src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TestToast from './pages/TestToast';

import Home from './pages/Home';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from './components/ui/toast';
import GlobalToastContainer from './components/GlobalToastContainer';
import { isLoggedIn } from './utils/auth';
import Checkout from './pages/Checkout';

function App() {
  return (
    
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />


        {/* Admin Module Routes */}
        <Route path="/admin/login" element={isLoggedIn() ? <Navigate to={'/admin'}/>: <AdminLogin />} />
        {/* <Route path="/delivery/login" element={isLoggedIn() ? <Navigate to={'/delivery'}/>: <AdminLogin />} /> */}
        
        {/* Protected Admin Dashboard Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <GlobalToastContainer />
    </Router>
  );
}

export default App;
// App.js or your main route file



