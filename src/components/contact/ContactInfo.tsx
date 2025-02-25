import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Instagram } from 'lucide-react';

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-neutral-800/50 rounded-lg p-6 space-y-6"
    >
      <h2 className="text-2xl font-serif text-white mb-6">Informations</h2>
      
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <MapPin className="w-5 h-5 text-amber-500 mt-1" />
          <div>
            <h3 className="text-white font-medium mb-1">Adresse</h3>
            <p className="text-gray-400">112 Rue Saint-Maur<br />75011 Paris</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="w-5 h-5 text-amber-500 mt-1" />
          <div>
            <h3 className="text-white font-medium mb-1">Horaires</h3>
            <p className="text-gray-400">
              Mardi - Samedi : 18h - 2h<br />
              Dimanche : 18h - 00h<br />
              Lundi : Fermé
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="w-5 h-5 text-amber-500 mt-1" />
          <div>
            <h3 className="text-white font-medium mb-1">Téléphone</h3>
            <a href="tel:+33658811000" className="text-gray-400 hover:text-amber-500 transition">
              +33 6 58 81 10 00
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="w-5 h-5 text-amber-500 mt-1" />
          <div>
            <h3 className="text-white font-medium mb-1">Email</h3>
            <a href="mailto:su.ruesaintmaur@gmail.com" className="text-gray-400 hover:text-amber-500 transition">
              su.ruesaintmaur@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Instagram className="w-5 h-5 text-amber-500 mt-1" />
          <div>
            <h3 className="text-white font-medium mb-1">Instagram</h3>
            <a 
              href="https://instagram.com/su.barajoie" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-500 transition"
            >
              @su.barajoie
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}