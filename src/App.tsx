import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useOneSignal } from './lib/notifications/oneSignal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cocktails from './pages/Cocktails';
import Reservations from './pages/Reservations';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminReservations from './pages/admin/Reservations';
import ReservationHistory from './pages/admin/ReservationHistory';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuthStore } from './lib/auth/session';

function App() {
  useOneSignal();
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Position aléatoire
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = Math.random() * 3 + 2 + 's';
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();
      
      document.querySelector('.particles-container')?.appendChild(particle);
      
      // Supprimer la particule après l'animation
      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    };

    // Créer des particules à intervalles réguliers
    const interval = setInterval(createParticle, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <div className="particles-background">
          <div className="particles-container"></div>
        </div>
        <div className="relative z-10 min-h-screen flex flex-col">
          <Routes>
            {/* Public routes */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <div className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/menu" element={<Menu />} />
                      <Route path="/cocktails" element={<Cocktails />} />
                      <Route path="/reservations" element={<Reservations />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </div>
                  <Footer />
                </>
              }
            />

            {/* Admin routes */}
            <Route path="/admin">
              <Route path="login" element={<AdminLogin />} />
              <Route
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="reservations" element={<AdminReservations />} />
                <Route path="history" element={<ReservationHistory />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;