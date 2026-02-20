import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useAuth } from '@/app/providers/AuthProvider';
import { FridgeItem } from '@/features/fridge/model/fridgeItem';
import {
  addFridgeItem,
  createDefaultFridge,
  getUserFridgeId,
  listenToFridgeItems,
  removeFridgeItem,
} from '@/features/fridge/api/fridgeService';

type FridgeContextType = {
  items: FridgeItem[];
  loading: boolean;
  addItem: (item: FridgeItem) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
};

const FridgeContext = createContext<FridgeContextType | null>(null);

export function FridgeProvider({ children }: { children: React.ReactNode }) {
  const { user, initializing } = useAuth();

  const [items, setItems] = useState<FridgeItem[]>([]);
  const [fridgeId, setFridgeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initializing) return;
    if (!user?.uid) {
      setItems([]);
      setFridgeId(null);
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    async function init() {
      try {
        if (!user) return null;

        setLoading(true);

        let id = await getUserFridgeId(user.uid);

        if (!id) {
          id = await createDefaultFridge(user.uid);
        }

        setFridgeId(id);

        unsubscribe = listenToFridgeItems(id, setItems);
      } catch (error) {
        console.error('🔥 FridgeProvider init error:', error);
      } finally {
        setLoading(false);
      }
    }

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid, initializing]);

  async function addItem(item: FridgeItem) {
    if (!fridgeId) return;
    await addFridgeItem(fridgeId, item);
  }

  async function removeItem(itemId: string) {
    if (!fridgeId) return;
    await removeFridgeItem(fridgeId, itemId);
  }

  return (
    <FridgeContext.Provider
      value={{
        items,
        loading,
        addItem,
        removeItem,
      }}
    >
      {children}
    </FridgeContext.Provider>
  );
}

export function useFridge() {
  const context = useContext(FridgeContext);
  if (!context) {
    throw new Error('useFridge must be used inside FridgeProvider');
  }
  return context;
}
