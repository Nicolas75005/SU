import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_oi78pgl';
const EMAILJS_TEMPLATE_ID = 'template_b4gbd3g';
const EMAILJS_PUBLIC_KEY = 'D2Mq36MhZtLH15fN0';

interface EmailParams {
  to_email: string;
  to_name: string;
  from_name: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  status: string;
  message: string;
  restaurant_address: string;
  restaurant_phone: string;
  restaurant_email: string;
}

const getStatusMessage = (status: string, guests: number, date: string, time: string): string => {
  if (status === 'confirmée') {
    return `
      Nous avons le plaisir de vous confirmer votre réservation pour ${guests} personne${guests > 1 ? 's' : ''} le ${date} à ${time}.

      Nous vous attendons avec impatience pour vous faire vivre une expérience gastronomique unique.

      Pour toute modification ou annulation, merci de nous contacter au moins 24h à l'avance.
    `;
  } else {
    return `
      Nous sommes au regret de vous informer que votre réservation pour ${guests} personne${guests > 1 ? 's' : ''} le ${date} à ${time} a dû être annulée.

      Si vous le souhaitez, nous serons ravis de vous proposer un autre créneau qui vous conviendrait mieux.

      N'hésitez pas à nous recontacter pour une nouvelle réservation.
    `;
  }
};

export const sendStatusEmail = async (params: Omit<EmailParams, 'from_name' | 'restaurant_address' | 'restaurant_phone' | 'restaurant_email' | 'message'>): Promise<boolean> => {
  try {
    const message = getStatusMessage(params.status, params.guests, params.reservation_date, params.reservation_time);

    const emailParams: EmailParams = {
      ...params,
      from_name: 'SU. Restaurant',
      message,
      restaurant_address: '112 Rue Saint-Maur, 75011 Paris',
      restaurant_phone: '+33 6 58 81 10 00',
      restaurant_email: 'su.ruesaintmaur@gmail.com'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      emailParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};