import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-neutral-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-neutral-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
          Objet *
        </label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-neutral-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-neutral-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
        />
      </div>

      {isSubmitted && (
        <div className="bg-green-900/50 text-green-300 px-4 py-2 rounded-md">
          Message envoyé avec succès !
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 transition flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        Envoyer
      </button>
    </motion.form>
  );
}