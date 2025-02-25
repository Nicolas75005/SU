import React from 'react';
import { motion } from 'framer-motion';

export default function Map() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-neutral-800/50 rounded-lg overflow-hidden h-[400px]"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.943881750618!2d2.377061315674052!3d48.867639779288584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dfb3db6e38f%3A0x78a6f0f9a2e056b3!2s112+Rue+Saint-Maur%2C+75011+Paris%2C+France!5e0!3m2!1sfr!2sfr!4v1706700000000!5m2!1sfr!2sfr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="112 Rue Saint-Maur, 75011 Paris"
      />
    </motion.div>
  );
}