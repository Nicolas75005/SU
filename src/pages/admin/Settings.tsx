import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Lock, Bell, Globe } from 'lucide-react';

export default function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-serif text-white">Paramètres</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-neutral-800/50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profil
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value="admin@su-paris.fr"
                  disabled
                  className="w-full bg-neutral-700 text-white px-4 py-2 rounded-md opacity-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full bg-neutral-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </form>
          </div>

          <div className="bg-neutral-800/50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Sécurité
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ancien mot de passe
                </label>
                <input
                  type="password"
                  className="w-full bg-neutral-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  className="w-full bg-neutral-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  className="w-full bg-neutral-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition"
              >
                Mettre à jour le mot de passe
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-neutral-800/50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="form-checkbox text-amber-500" />
                <span className="text-gray-300">Nouvelles réservations</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="form-checkbox text-amber-500" />
                <span className="text-gray-300">Messages de contact</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="form-checkbox text-amber-500" />
                <span className="text-gray-300">Mises à jour système</span>
              </label>
            </div>
          </div>

          <div className="bg-neutral-800/50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Préférences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Langue
                </label>
                <select className="w-full bg-neutral-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none">
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fuseau horaire
                </label>
                <select className="w-full bg-neutral-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none">
                  <option value="Europe/Paris">Europe/Paris</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}