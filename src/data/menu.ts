import { MenuItem } from '../types';

export const menuItems: Record<string, MenuItem[]> = {
  sharing: [
    {
      id: 'asperges',
      name: 'Asperges en Viennoise de Comté et Noisette',
      description: 'Gel de Jaune d\'Oeuf',
      price: 13,
      category: 'sharing',
      dietary: ['vegetarian'],
    },
    {
      id: 'falafel',
      name: 'Falafel, Yaourt Grec Citronné',
      description: 'Fait maison avec des pois chiches bio',
      price: 9,
      category: 'sharing',
      dietary: ['vegetarian', 'vegan-option'],
    },
    {
      id: 'stracciatella',
      name: 'Stracciatella, Huile de Basilic',
      description: 'Fromage frais italien crémeux',
      price: 12,
      category: 'sharing',
      dietary: ['vegetarian'],
    },
  ],
  vegetarian: [
    {
      id: 'chakshuka',
      name: 'Chakshuka, Oeuf Parfait, Crème Feta',
      description: 'Huile aux Herbes',
      price: 15,
      category: 'vegetarian',
      dietary: ['vegetarian'],
    },
    {
      id: 'bricks',
      name: 'Bricks Pomme de Terre Oeuf',
      description: 'Mélange d\'Herbes, Sauce Harissa Maison',
      price: 9,
      category: 'vegetarian',
      dietary: ['vegetarian'],
    },
  ],
  seafood: [
    {
      id: 'tarama',
      name: 'Tarama et Oeufs de Truite',
      price: 12,
      category: 'seafood',
    },
    {
      id: 'cromesquis',
      name: 'Cromesquis de Haddock & Patate Douce',
      description: 'Sauce Tartare',
      price: 13,
      category: 'seafood',
    },
  ],
  main: [
    {
      id: 'poulet-panko',
      name: 'Poulet Panko, Sauce Teriyaki',
      description: 'Mayonnaise Citron Vert Gingembre',
      price: 14,
      category: 'main',
    },
    {
      id: 'meatballs',
      name: 'Meatballs de Veau',
      description: 'Houmous de Pois Chiche Frits, Huile aux Herbes',
      price: 15,
      category: 'main',
    },
  ],
  cheese: [
    {
      id: 'pecorino',
      name: 'Pecorino',
      description: 'Poivre, Miel, Dattes Medjool',
      price: 12,
      category: 'cheese',
    },
  ],
  dessert: [
    {
      id: 'espuma-chocolat',
      name: 'Espuma de Chocolat',
      description: 'Millefeuille de Bricks, Fleur de Sel',
      price: 12,
      category: 'dessert',
    },
  ],
};