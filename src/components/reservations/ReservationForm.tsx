import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { fr } from 'date-fns/locale';
import { Calendar, Users, Mail, Phone, AlertCircle } from 'lucide-react';
import { reservationSchema } from '../../lib/validation/reservationSchema';
import { createReservation, checkAvailability } from '../../lib/api/reservations';
import type { ReservationFormData } from '../../lib/validation/reservationSchema';
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css"; // Import des styles personnalisés

export default function ReservationForm() {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    date: new Date(),
    time: '19:00',
    guests: 2,
    specialRequests: ''
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error' | 'checking';
    message: string;
  }>({
    type: 'idle',
    message: ''
  });

  // Générer les créneaux horaires entre 18h00 et 00h30
  const timeSlots = Array.from({ length: 14 }, (_, i) => {
  const hour = (Math.floor(i / 2) + 18) % 24; // ← modulo ici
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'checking', message: 'Vérification de la disponibilité...' });

    try {
      // Valider les données du formulaire
      const validatedData = reservationSchema.parse(formData);

      // Vérifier la disponibilité
      const { available, remainingCapacity } = await checkAvailability(
        validatedData.date,
        validatedData.time,
        validatedData.guests
      );

      if (!available) {
        setStatus({
          type: 'error',
          message: `Désolé, nous ne pouvons pas accueillir ${validatedData.guests} personnes à cette date et heure. Il reste ${remainingCapacity} places disponibles.`
        });
        return;
      }

      // Créer la réservation
      const response = await createReservation(validatedData);

      if (response.success) {
        setStatus({
          type: 'success',
          message: 'Votre demande de réservation a été envoyée. Vous recevrez un email de confirmation.'
        });

        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: new Date(),
          time: '19:00',
          guests: 2,
          specialRequests: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: response.message
        });
      }
    } catch (err: any) {
      if (err.errors) {
        setStatus({
          type: 'error',
          message: err.errors[0].message
        });
      } else {
        setStatus({
          type: 'error',
          message: 'Une erreur est survenue lors de la réservation'
        });
      }
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="bg-neutral-800/50 rounded-lg p-6 space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Calendar className="w-4 h-4 inline-block mr-2" />
            Date *
          </label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date: date || new Date() })}
            locale={fr}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            className="w-full bg-neutral-700 text-white rounded-md px-4 py-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Heure *
          </label>
          <select
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full bg-neutral-700 text-white rounded-md px-4 py-2"
          >
            {timeSlots.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-400">
            Dernier service à 00h30
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <Users className="w-4 h-4 inline-block mr-2" />
          Nombre de personnes *
        </label>
        <input
          type="number"
          min="1"
          max="20"
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
          className="w-full bg-neutral-700 text-white rounded-md px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Nom complet *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-neutral-700 text-white rounded-md px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <Mail className="w-4 h-4 inline-block mr-2" />
          Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-neutral-700 text-white rounded-md px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <Phone className="w-4 h-4 inline-block mr-2" />
          Téléphone *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Ex: 06 12 34 56 78"
          className="w-full bg-neutral-700 text-white rounded-md px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Demandes spéciales
        </label>
        <textarea
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          className="w-full bg-neutral-700 text-white rounded-md px-4 py-2"
          rows={4}
          placeholder="Allergies, préférences alimentaires, occasion spéciale..."
        />
      </div>

      {status.message && (
        <div className={`p-4 rounded-md flex items-center gap-2 ${
          status.type === 'error' ? 'bg-red-900/50 text-red-300' : 
          status.type === 'success' ? 'bg-green-900/50 text-green-300' :
          'bg-amber-900/50 text-amber-300'
        }`}>
          <AlertCircle className="w-5 h-5" />
          <p>{status.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status.type === 'checking'}
        className="w-full bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status.type === 'checking' ? 'Vérification...' : 'Réserver'}
      </button>

      <p className="text-sm text-gray-400 text-center">
        * Champs obligatoires. Votre réservation sera confirmée après validation par notre équipe.
      </p>
    </motion.form>
  );
}