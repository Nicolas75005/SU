import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminNav from './AdminNav';
import ReservationNotification from './ReservationNotification';
import { useAuthStore } from '../../lib/auth/session';

export default function AdminLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <AdminNav />
      <ReservationNotification />
      <div className="lg:pl-64 transition-all duration-300">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}