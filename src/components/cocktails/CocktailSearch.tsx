import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function CocktailSearch({ searchQuery, onSearchChange }: Props) {
  return (
    <div className="relative mb-8">
      <input
        type="text"
        placeholder="Rechercher un cocktail..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full bg-neutral-800/50 text-white rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
}