import { MenuItem } from '../types';

export const cocktails: MenuItem[] = [
  // Les Classiques
  {
    id: 'gin-tonic',
    name: 'Gin Tonic',
    description: 'Le classique revisité',
    price: 10,
    category: 'cocktails',
    alcoholType: 'gin',
    difficulty: 1,
    preparationTime: 5,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a'
  },
  {
    id: 'les-mules',
    name: 'Les Mules',
    description: 'Vodka, ginger beer, citron vert',
    price: 10,
    category: 'cocktails',
    alcoholType: 'vodka',
    difficulty: 1,
    preparationTime: 5,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1530991808291-7e157454758c'
  },
  {
    id: 'basil-smash',
    name: 'Basil Smash',
    description: 'Gin infusé au basilic frais, citron',
    price: 12,
    category: 'cocktails',
    alcoholType: 'gin',
    difficulty: 2,
    preparationTime: 8,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1540734894902-64d60c88e591'
  },
  {
    id: 'pornstar-martini',
    name: 'Pornstar Martini',
    description: 'Vodka vanille, fruit de la passion, shot de champagne',
    price: 12,
    category: 'cocktails',
    alcoholType: 'vodka',
    difficulty: 2,
    preparationTime: 10,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1619604395920-a16f33192a50'
  },
  {
    id: 'mezcalita',
    name: 'Mezcalita',
    description: 'Mezcal, citron vert, sel épicé',
    price: 12,
    category: 'cocktails',
    alcoholType: 'mezcal',
    difficulty: 2,
    preparationTime: 7,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b'
  },
  {
    id: 'negroni',
    name: 'Negroni',
    description: 'Gin, Campari, vermouth rouge',
    price: 12,
    category: 'cocktails',
    alcoholType: 'gin',
    difficulty: 1,
    preparationTime: 5,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c'
  },
  {
    id: 'saint-germain-spritz',
    name: 'Saint Germain Spritz',
    description: 'Liqueur de sureau, prosecco, eau gazeuse',
    price: 12,
    category: 'cocktails',
    alcoholType: 'gin',
    difficulty: 1,
    preparationTime: 5,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc'
  },
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    description: 'Bourbon, sucre, bitter Angostura',
    price: 12,
    category: 'cocktails',
    alcoholType: 'whisky',
    difficulty: 2,
    preparationTime: 8,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187'
  },

  // Les Créations Signatures
  {
    id: 'pineapple-express',
    name: 'Pineapple Express',
    description: 'Whisky infusé à l\'Ananas rôti, sirop d\'Ananas à la Vanille de Madagascar maison, blanc d\'œuf',
    price: 14,
    category: 'cocktails',
    alcoholType: 'whisky',
    difficulty: 3,
    preparationTime: 12,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1606924735276-fbb5b325e933'
  },
  {
    id: 'kiwi-collins',
    name: 'Kiwi Collins',
    description: 'Vodka, sirop de Kiwi à la Vanille de Madagascar maison, Limonade',
    price: 12,
    category: 'cocktails',
    alcoholType: 'vodka',
    difficulty: 2,
    preparationTime: 10,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813'
  },
  {
    id: 'sunny',
    name: 'Sunny',
    description: 'Rhum, Vanille, Passion, Ginger Beer',
    price: 12,
    category: 'cocktails',
    alcoholType: 'rum',
    difficulty: 2,
    preparationTime: 8,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd'
  },
  {
    id: 'peach-75',
    name: 'Peach 75',
    description: 'Gin, Amaretto, Liqueur de Pêche, Champagne',
    price: 13,
    category: 'cocktails',
    alcoholType: 'gin',
    difficulty: 2,
    preparationTime: 10,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1587223075055-82e9a937ddff'
  },
  {
    id: 'nord',
    name: 'Nord',
    description: 'Vodka, Purée de Poire, Génépi, Ginger Beer',
    price: 14,
    category: 'cocktails',
    alcoholType: 'vodka',
    difficulty: 2,
    preparationTime: 10,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b'
  },
  {
    id: 'jungle-bird',
    name: 'Jungle Bird',
    description: 'Mezcal, Campari, Liqueur de Gingembre, Purée de passion',
    price: 14,
    category: 'cocktails',
    alcoholType: 'mezcal',
    difficulty: 3,
    preparationTime: 12,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b'
  },
  {
    id: 'clover-club',
    name: 'Clover Club',
    description: 'Gin, Framboise fraîches, citron vert',
    price: 14,
    category: 'cocktails',
    alcoholType: 'gin',
    difficulty: 2,
    preparationTime: 10,
    isAlcoholic: true,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b'
  }
];