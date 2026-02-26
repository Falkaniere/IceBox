import React, { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from '@/app/providers/AuthProvider';
import { FridgeItem } from '@/features/fridge/model/fridgeItem';
import {
  addFridgeItem,
  createDefaultFridge,
  getUserFridgeId,
  listenToFridgeItems,
  removeFridgeItem,
  updateFridgeItem,
} from '@/features/fridge/api/fridgeService';

import { scheduleExpiryNotifications } from '@/features/notifications/scheduleExpiryNotification';
import { cancelExpiryNotifications } from '@/features/notifications/cancelExpiryNotification';
import { setupNotifications } from '@/app/notifications/setup';

type FridgeContextType = {
  items: FridgeItem[];
  loading: boolean;
  addItem: (item: FridgeItem) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateItem: (itemId: string, updates: Partial<FridgeItem>) => Promise<void>;
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
        setLoading(true);

        if (!user?.uid) return;

        let id = await getUserFridgeId(user.uid);

        if (!id) {
          id = await createDefaultFridge(user.uid);
        }

        setFridgeId(id);
        await setupNotifications();

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

  /**
   * ADD ITEM
   */
  async function addItem(item: FridgeItem) {
    if (!fridgeId) return;

    await addFridgeItem(fridgeId, item);

    await scheduleExpiryNotifications(item.id, item.name, item.expiresAt);
  }

  /**
   * REMOVE ITEM
   */
  async function removeItem(itemId: string) {
    if (!fridgeId) return;

    await cancelExpiryNotifications(itemId);

    await removeFridgeItem(fridgeId, itemId);
  }

  /**
   * UPDATE ITEM
   */
  async function updateItem(itemId: string, updates: Partial<FridgeItem>) {
    if (!fridgeId) return;

    const oldItem = items.find(item => item.id === itemId);

    if (!oldItem) return;

    const finalName = updates.name ?? oldItem.name;

    const finalExpiresAt = updates.expiresAt ?? oldItem.expiresAt;

    await cancelExpiryNotifications(itemId);
    await updateFridgeItem(fridgeId, itemId, updates);

    await scheduleExpiryNotifications(itemId, finalName, finalExpiresAt);
  }

  return (
    <FridgeContext.Provider
      value={{
        items,
        loading,
        addItem,
        removeItem,
        updateItem,
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
