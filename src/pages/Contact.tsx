import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import Map from '../components/contact/Map';

export default function Contact() {
  return (
    <main className="min-h-screen bg-neutral-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Contact</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Une question ? Une réservation ? N'hésitez pas à nous contacter,
            nous vous répondrons dans les plus brefs délais.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ContactForm />
          <ContactInfo />
        </div>

        <Map />
      </div>
    </main>
  );
}