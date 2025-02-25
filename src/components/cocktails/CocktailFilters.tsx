import React from 'react';
import { CocktailFilter } from '../../types';
import { Filter } from 'lucide-react';

interface Props {
  filters: CocktailFilter;
  onFilterChange: (filters: CocktailFilter) => void;
}

export default function CocktailFilters({ filters, onFilterChange }: Props) {
  const alcoholTypes = ['gin', 'vodka', 'rum', 'whisky', 'mezcal'];

  return (
    <div className="bg-neutral-800/50 rounded-lg p-4 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-medium text-white">Filtres</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Type d'alcool</label>
          <select
            value={filters.alcoholType || ''}
            onChange={(e) => onFilterChange({ ...filters, alcoholType: e.target.value || null })}
            className="w-full bg-neutral-700 text-white rounded-md px-3 py-2"
          >
            <option value="">Tous</option>
            {alcoholTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Difficulté</label>
          <select
            value={filters.difficulty || ''}
            onChange={(e) => onFilterChange({ ...filters, difficulty: parseInt(e.target.value) || null })}
            className="w-full bg-neutral-700 text-white rounded-md px-3 py-2"
          >
            <option value="">Toutes</option>
            <option value="1">Facile</option>
            <option value="2">Moyen</option>
            <option value="3">Expert</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Type</label>
          <select
            value={filters.isAlcoholic === null ? '' : filters.isAlcoholic.toString()}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              isAlcoholic: e.target.value === '' ? null : e.target.value === 'true'
            })}
            className="w-full bg-neutral-700 text-white rounded-md px-3 py-2"
          >
            <option value="">Tous</option>
            <option value="true">Avec alcool</option>
            <option value="false">Sans alcool</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Temps de préparation</label>
          <select
            value={filters.preparationTime || ''}
            onChange={(e) => onFilterChange({ ...filters, preparationTime: parseInt(e.target.value) || null })}
            className="w-full bg-neutral-700 text-white rounded-md px-3 py-2"
          >
            <option value="">Tous</option>
            <option value="5">5 minutes ou moins</option>
            <option value="10">10 minutes ou moins</option>
            <option value="15">15 minutes ou moins</option>
          </select>
        </div>
      </div>
    </div>
  );
}