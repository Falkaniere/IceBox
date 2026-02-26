import React from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';

import FridgeItem from '@/features/fridge/components/FridgeItem';
import { styles } from './styles';
import { useAppTranslation } from '@/app/i18n/useAppTranslation';
import { FridgeItem as FridgeItemType } from '@/features/fridge/model/fridgeItem';

type FridgeListProps = {
  data: FridgeItemType[];
  onEdit: (item: FridgeItemType) => void;
};

export default function FridgeList({ data, onEdit }: FridgeListProps) {
  const { t } = useAppTranslation('fridge');

  const renderItem: ListRenderItem<FridgeItemType> = ({ item }) => {
    return <FridgeItem item={item} onEdit={onEdit} />;
  };

  const keyExtractor = (item: FridgeItemType) => item.id;

  const ItemSeparator = () => <View style={styles.separator} />;

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>{t('empty_title')}</Text>
      <Text style={styles.emptySubtitle}>{t('empty_subtitle')}</Text>
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
