import React, { createContext, useContext, useMemo, useState } from 'react';
import { FridgeItem } from '@/features/fridge/model/fridgeItem';

type FridgeContextType = {
  items: FridgeItem[];
  addItem: (item: FridgeItem) => void;
  removeItem: (id: string) => void;
  updateItem: (item: FridgeItem) => void;
  clearItems: () => void;
};

const FridgeContext = createContext<FridgeContextType | null>(null);

export function FridgeProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FridgeItem[]>([]);

  function addItem(item: FridgeItem) {
    setItems(prev => [...prev, item]);
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  function updateItem(updatedItem: FridgeItem) {
    setItems(prev =>
      prev.map(item => (item.id === updatedItem.id ? updatedItem : item)),
    );
  }

  function clearItems() {
    setItems([]);
  }

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateItem,
      clearItems,
    }),
    [items],
  );

  return (
    <FridgeContext.Provider value={value}>{children}</FridgeContext.Provider>
  );
}

export function useFridge() {
  const context = useContext(FridgeContext);
  if (!context) {
    throw new Error('useFridge must be used inside FridgeProvider');
  }
  return context;
}
