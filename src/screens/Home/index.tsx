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
import { FridgeItem } from '@/features/fridge/model/fridgeItem';

type FilterType = 'all' | 'expired' | 'soon';

export default function HomeScreen() {
  const { items } = useFridge();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FridgeItem | null>(null);
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

  function handleAddPress() {
    setSelectedItem(null);
    setIsAddModalOpen(true);
  }

  function handleEdit(item: FridgeItem) {
    setSelectedItem(item);
    setIsAddModalOpen(true);
  }

  function handleCloseModal() {
    setIsAddModalOpen(false);
    setSelectedItem(null);
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <Header onAddPress={handleAddPress} />

          <Search
            query={query}
            onChangeQuery={setQuery}
            filter={filter}
            onChangeFilter={setFilter}
          />

          <FridgeList data={filteredData} onEdit={handleEdit} />
        </View>
      </SafeAreaView>

      <Modal
        visible={isAddModalOpen}
        animationType='slide'
        presentationStyle='fullScreen'
        transparent
        onRequestClose={handleCloseModal}
      >
        <AddItemToFridge
          onClose={handleCloseModal}
          item={selectedItem ?? undefined}
        />
      </Modal>
    </>
  );
}
