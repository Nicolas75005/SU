import React from 'react';
import { motion } from 'framer-motion';

export default function Map() {
  // GPS coordinates for 112 rue Saint-Maur, 75011 Paris
  const latitude = 48.86671;
  const longitude = 2.37954;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-neutral-800/50 rounded-lg overflow-hidden h-[400px]"
    >
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dfb51d8a18f%3A0x5cf43e6c4e34cc4d!2s112%20Rue%20Saint-Maur%2C%2075011%20Paris!5e0!3m2!1sfr!2sfr!4v1647887777777!5m2!1sfr!2sfr`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="SU. Restaurant Location"
      />
    </motion.div>
  );
}