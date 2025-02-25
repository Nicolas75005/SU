import React, { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';

declare global {
  interface Window {
    OneSignal?: any;
  }
}

export default function PushNotificationButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    if (window.OneSignal) {
      try {
        const state = await window.OneSignal.getNotificationPermission();
        setIsSubscribed(state === 'granted');
      } catch (error) {
        console.error('Erreur lors de la vérification du statut:', error);
      }
    }
  };

  const handleSubscriptionToggle = async () => {
    if (!window.OneSignal) return;

    setIsLoading(true);
    try {
      if (isSubscribed) {
        await window.OneSignal.setSubscription(false);
        setIsSubscribed(false);
      } else {
        const result = await window.OneSignal.showNativePrompt();
        if (result) {
          setIsSubscribed(true);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la modification de l\'abonnement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscriptionToggle}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
        isSubscribed
          ? 'bg-green-900/20 text-green-400 hover:bg-green-900/30'
          : 'bg-amber-600 text-white hover:bg-amber-700'
      }`}
    >
      {isSubscribed ? (
        <>
          <BellOff className="w-4 h-4" />
          Désactiver les notifications
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