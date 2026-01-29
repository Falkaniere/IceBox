import React from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';

import FridgeItem from '@/features/fridge/components/FridgeItem';
import { styles } from './styles';

type FridgeListProps = {
  data: any[];
};

export default function FridgeList({ data }: FridgeListProps) {
  const renderItem: ListRenderItem<any> = ({ item }) => {
    return <FridgeItem item={item} />;
  };

  const keyExtractor = (item: any) => String(item.id);

  const ItemSeparator = () => <View style={styles.separator} />;

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Your fridge is empty</Text>
      <Text style={styles.emptySubtitle}>
        Tap the + button to add your first item.
      </Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={EmptyState}
      contentContainerStyle={[
        styles.contentContainer,
        data.length === 0 && styles.contentContainerEmpty,
      ]}
      showsVerticalScrollIndicator={false}
    />
  );
}
