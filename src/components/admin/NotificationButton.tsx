import React from 'react';
import { Bell, BellOff, AlertCircle } from 'lucide-react';
import { useNotifications } from '../../lib/hooks/useNotifications';

export default function NotificationButton() {
  const { permission, supported, requestPermission, subscribeToNewReservations } = useNotifications();

  const handleClick = async () => {
    try {
      if (permission === 'default') {
        const result = await requestPermission();
        if (result === 'granted') {
          subscribeToNewReservations();
        }
      } else if (permission === 'granted') {
        subscribeToNewReservations();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (!supported) {
    return (
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>Notifications non supportées</span>
      </div>
    );
  }

  if (permission === 'denied') {
    return (
      <div className="flex items-center gap-2 text-red-400 text-sm">
        <BellOff className="w-4 h-4" />
        <span>Notifications bloquées</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
        permission === 'granted'
          ? 'bg-green-900/20 text-green-400 hover:bg-green-900/30'
          : 'bg-amber-600 text-white hover:bg-amber-700'
      }`}
    >
      {permission === 'granted' ? (
        <>
          <Bell className="w-4 h-4" />
          Notifications activées
        </>
      ) : (
        <>
          <Bell className="w-4 h-4" />
          Activer les notifications
        </>
      )}
    </button>
  );
}