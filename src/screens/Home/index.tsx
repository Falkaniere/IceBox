import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '@/features/fridge/components/Header';
import Search from '@/features/fridge/components/Search';
import FridgeList from '@/features/fridge/components/FridgeList';
import type { FridgeFilter } from '@/features/fridge/components/Search/filters';

import { getExpiryStatus } from '@/app/utils/expiry';
import { styles } from './styles';

type FridgeItem = {
  id: string;
  name: string;
  expiresAt: string; // ISO string
  qty: number;
  icon?: string;
};

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FridgeFilter>('all');

  const data: FridgeItem[] = [
    { id: '1', name: 'red_apple', expiresAt: '2026-01-31', qty: 4, icon: '🍎' },
    {
      id: '2',
      name: 'glass_of_milk',
      expiresAt: '2026-03-10',
      qty: 2,
      icon: '🥛',
    },
    { id: '3', name: 'broccoli', expiresAt: '2026-01-20', qty: 1, icon: '🥦' },
    {
      id: '4',
      name: 'cheese_wedge',
      expiresAt: '2026-01-10',
      qty: 1,
      icon: '🧀',
    },
  ];

  const enrichedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      status: getExpiryStatus(item.expiresAt, 5), // soon threshold: 5 days (change anytime)
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();

    return enrichedData.filter(item => {
      const matchesQuery =
        q.length === 0 || item.name.toLowerCase().includes(q);

      const matchesFilter =
        filter === 'all' ||
        (filter === 'expired' && item.status === 'expired') ||
        (filter === 'soon' && item.status === 'soon');

      return matchesQuery && matchesFilter;
    });
  }, [enrichedData, query, filter]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Header />
        <Search
          query={query}
          onChangeQuery={setQuery}
          filter={filter}
          onChangeFilter={setFilter}
        />
        <FridgeList data={filteredData} />
      </View>
    </SafeAreaView>
  );
}
