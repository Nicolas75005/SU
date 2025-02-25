import { supabase } from '../auth/supabase';
import { ReservationFormData } from '../../types';

// Constantes pour la gestion des périodes
const DINING_DURATION = 120; // 2 heures par défaut pour un service
const RESTAURANT_CAPACITY = 60; // Capacité totale du restaurant

// Vérifier la disponibilité générale
export const checkAvailability = async (
  date: Date,
  time: string,
  guests: number
): Promise<{
  available: boolean;
  remainingCapacity: number;
}> => {
  try {
    // Récupérer toutes les réservations confirmées pour cette date
    const { data: existingReservations, error } = await supabase
      .from('reservations')
      .select('time, guests')
      .eq('date', date.toISOString().split('T')[0])
      .eq('status', 'confirmed');

    if (error) throw error;

    // Calculer le nombre total de places réservées pour ce créneau
    const reservedSeats = existingReservations.reduce((total, reservation) => {
      // On considère que les réservations du même créneau se chevauchent
      if (reservation.time === time) {
        return total + reservation.guests;
      }
      return total;
    }, 0);

    // Vérifier la disponibilité
    const remainingCapacity = RESTAURANT_CAPACITY - reservedSeats;
    const available = remainingCapacity >= guests;

    return {
      available,
      remainingCapacity
    };
  } catch (error) {
    console.error('Erreur lors de la vérification de disponibilité:', error);
    throw error;
  }
};

// Créer une nouvelle réservation
export const createReservation = async (data: ReservationFormData) => {
  try {
    // Vérifier la disponibilité
    const { available, remainingCapacity } = await checkAvailability(
      data.date,
      data.time,
      data.guests
    );

    if (!available) {
      return {
        success: false,
        message: `Désolé, nous ne pouvons pas accueillir ${data.guests} personnes à cette date et heure. Il reste ${remainingCapacity} places disponibles.`
      };
    }

    // Créer la réservation sans numéro de table
    const { data: reservation, error } = await supabase
      .from('reservations')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date.toISOString().split('T')[0],
        time: data.time,
        guests: data.guests,
        special_requests: data.specialRequests,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;

    // Envoyer l'email de confirmation
    await sendConfirmationEmail(reservation);

    return {
      success: true,
      message: 'Votre demande de réservation a été enregistrée. La table vous sera attribuée à votre arrivée.',
      reservationId: reservation.id
    };
  } catch (error: any) {
    console.error('Erreur lors de la création de la réservation:', error);
    return {
      success: false,
      message: error.message || 'Une erreur est survenue lors de la création de la réservation'
    };
  }
};

// Fonction utilitaire pour envoyer l'email de confirmation
const sendConfirmationEmail = async (reservation: any) => {
  // Cette fonction serait implémentée avec un service d'envoi d'emails
  const emailContent = `
    Bonjour ${reservation.name},

    Nous avons bien reçu votre demande de réservation pour ${reservation.guests} personne(s) le ${reservation.date} à ${reservation.time}.

    Une table vous sera attribuée à votre arrivée par notre équipe.

    En cas d'empêchement, merci de nous prévenir au moins 24h à l'avance.

    À bientôt chez SU.
  `;

  console.log('Email de confirmation envoyé:', emailContent);
};