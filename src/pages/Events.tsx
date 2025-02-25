import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Music } from 'lucide-react';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Soirée Jazz Live",
      date: "Tous les jeudis",
      description: "Profitez d'une soirée jazz avec nos musiciens résidents",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 2,
      title: "DJ Set",
      date: "Vendredis et samedis",
      description: "Ambiance électro et house music par nos DJs",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Événements</h1>
          <p className="text-gray-400">
            Découvrez nos soirées et événements spéciaux
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-neutral-800/50 rounded-lg overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-serif text-white mb-2">{event.title}</h2>
                <div className="flex items-center text-amber-500 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <p className="text-gray-400">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center text-amber-500">
            <Music className="w-5 h-5 mr-2" />
            <span>Pour plus d'informations sur nos événements, contactez-nous</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Events;