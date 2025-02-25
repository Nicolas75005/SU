import { useEffect } from 'react';

declare global {
  interface Window {
    OneSignalDeferred?: any[];
    OneSignal?: any;
  }
}

const ONESIGNAL_APP_ID = 'af029530-ac51-44a2-b809-315f55b74194';
const ONESIGNAL_REST_API_KEY = 'os_v2_app_v4bjkmfmkfckfoajgfpvln2bsqkuiilwwt3ugvfor7z34g45t4sbsmst66dyxbmbvk6wbj3h5s6ui3l6lywc4uxpatxtivab3yj2gsq';

export const useOneSignal = () => {
  useEffect(() => {
    // OneSignal is already initialized in index.html
    // This hook is kept for future functionality
  }, []);

  return null;
};

export const sendNotification = async (data: {
  title: string;
  message: string;
  url?: string;
  segment?: string;
}) => {
  try {
    if (!window.OneSignal) {
      throw new Error('OneSignal not initialized');
    }

    const notification = {
      app_id: ONESIGNAL_APP_ID,
      contents: { en: data.message },
      headings: { en: data.title },
      url: data.url,
      included_segments: data.segment ? [data.segment] : ['Subscribed Users']
    };

    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`
      },
      body: JSON.stringify(notification)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0] || 'Failed to send notification');
    }

    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};