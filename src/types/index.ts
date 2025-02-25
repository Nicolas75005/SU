export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'cocktails' | 'sharing' | 'main' | 'dessert';
  image?: string;
  alcoholType?: 'gin' | 'vodka' | 'rum' | 'whisky' | 'mezcal' | 'none';
  difficulty?: 1 | 2 | 3;
  preparationTime?: number;
  isAlcoholic?: boolean;
  dietary?: string[];
}

export interface CocktailFilter {
  alcoholType: string | null;
  difficulty: number | null;
  isAlcoholic: boolean | null;
  preparationTime: number | null;
}

export interface ReservationFormData {
  date: Date;
  time: string;
  guests: number;
  email: string;
  phone: string;
  name: string;
  specialRequests?: string;
}

export interface ReservationResponse {
  success: boolean;
  message: string;
  reservationId?: string;
}