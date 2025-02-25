import React from 'react';
import Hero from '../components/Hero';
import MenuLink from '../components/common/MenuLink';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Instagram } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <Hero />
      
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h1 className="text-3xl font-serif text-white mb-6">Bienvenue chez SU.</h1>
              <p className="text-gray-300 mb-8">
                Un espace unique où se mêlent gastronomie raffinée, cocktails créatifs et ambiance chaleureuse. 
                Notre restaurant-bar vous invite à découvrir une expérience culinaire exceptionnelle dans un cadre élégant et contemporain.
              </p>
              <MenuLink />
              <div className="space-y-4 mt-8">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-amber-500" />
                  <span>112 Rue Saint-Maur, 75011 Paris</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-3 text-amber-500" />
                  <span>Mar-Sam: 18h-2h | Dim: 18h-00h</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 mr-3 text-amber-500" />
                  <span>+33 6 58 81 10 00</span>
                </div>
                <a 
                  href="https://instagram.com/su.barajoie" 
                  className="flex items-center text-gray-300 hover:text-amber-500 transition"
                >
                  <Instagram className="w-5 h-5 mr-3" />
                  <span>@su.barajoie</span>
                </a>
              </div>
            </div>
            <div className="relative h-96">
              <img
                src="https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Interior of SU."
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}