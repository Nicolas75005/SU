import { supabase } from '../auth/supabase';

export const sendPushNotification = async (subscription: PushSubscription, data: {
  title: string;
  body: string;
  url?: string;
}) => {
  try {
    const response = await fetch('/api/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription,
        data
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi de la notification push');
    }
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker enregistré:', registration);
      return registration;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
      throw error;
    }
  }
  throw new Error('Service Worker non supporté');
};