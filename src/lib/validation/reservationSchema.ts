import { z } from 'zod';

export const reservationSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  
  email: z
    .string()
    .email('Adresse email invalide')
    .max(255, 'L\'email ne peut pas dépasser 255 caractères'),
  
  phone: z
    .string()
    .regex(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      'Numéro de téléphone invalide'
    ),
  
  date: z
    .date()
    .min(new Date(), 'La date doit être dans le futur')
    .max(
      new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      'Les réservations sont limitées à 90 jours à l\'avance'
    ),
  
  time: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide'),
  
  guests: z
    .number()
    .int('Le nombre de personnes doit être un nombre entier')
    .min(1, 'Minimum 1 personne')
    .max(20, 'Maximum 20 personnes'),
  
  specialRequests: z
    .string()
    .max(500, 'Les demandes spéciales ne peuvent pas dépasser 500 caractères')
    .optional()
});

export type ReservationFormData = z.infer<typeof reservationSchema>;