import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '../../types';
import { Leaf } from 'lucide-react';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
}

export default function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-serif text-amber-500 mb-6">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-neutral-800/50 rounded-lg p-6 hover:bg-neutral-800 transition"
          >
            {item.image && (
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">
                  {item.name}
                  {item.dietary?.includes('vegetarian') && (
                    <Leaf className="inline-block w-4 h-4 ml-2 text-green-500" />
                  )}
                </h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
              <span className="text-amber-500 font-medium">{item.price}€</span>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}