import React from 'react';
import MenuHeader from '../components/menu/MenuHeader';
import MenuSection from '../components/menu/MenuSection';
import DietaryInfo from '../components/menu/DietaryInfo';
import { menuItems } from '../data/menu';

export default function Menu() {
  return (
    <div className="min-h-screen bg-neutral-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MenuHeader />
        
        <MenuSection
          title="Assiettes à Partager"
          items={menuItems.sharing}
        />
        
        <MenuSection
          title="Assiettes Végétariennes"
          items={menuItems.vegetarian}
        />
        
        <MenuSection
          title="Assiettes de la Mer"
          items={menuItems.seafood}
        />
        
        <MenuSection
          title="Assiettes de la Terre"
          items={menuItems.main}
        />
        
        <MenuSection
          title="Assiette de Fromage"
          items={menuItems.cheese}
        />
        
        <MenuSection
          title="Dessert à Partager"
          items={menuItems.dessert}
        />
        
        <DietaryInfo />
      </div>
    </div>
  );
}