import React, { useMemo, useState } from 'react';
import { View, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '@/features/fridge/components/Header';
import Search from '@/features/fridge/components/Search';
import FridgeList from '@/features/fridge/components/FridgeList';
import AddItemToFridge from '@/features/fridge/components/AddItem';

import { useFridge } from '@/features/fridge/providers/FridgeProvider';
import { getExpiryStatus } from '@/app/utils/expiry';
import { styles } from './styles';

export default function HomeScreen() {
  const { items } = useFridge();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const enrichedData = useMemo(() => {
    return items.map(item => ({
      ...item,
      status: getExpiryStatus(item.expiresAt, 5),
    }));
  }, [items]);

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
    <>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <Header onAddPress={() => setIsAddModalOpen(true)} />
          <Search
            query={query}
            onChangeQuery={setQuery}
            filter={filter}
            onChangeFilter={setFilter}
          />
          <FridgeList data={filteredData} />
        </View>
      </SafeAreaView>

      <Modal
        visible={isAddModalOpen}
        animationType='slide'
        presentationStyle='fullScreen'
        transparent
      >
        <AddItemToFridge onClose={() => setIsAddModalOpen(false)} />
      </Modal>
    </>
  );
}
