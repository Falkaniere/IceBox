import { FridgeItem } from '@/features/fridge/model/fridgeItem';
import { useMemo, useState } from 'react';

export function useFridgeItems() {
  const [items, setItems] = useState<FridgeItem[]>([]);

  function addItem(item: FridgeItem) {
    setItems(prev => [...prev, item]);
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  function updateItem(updated: FridgeItem) {
    setItems(prev =>
      prev.map(item => (item.id === updated.id ? updated : item)),
    );
  }

  return {
    items,
    addItem,
    removeItem,
    updateItem,
  };
}
