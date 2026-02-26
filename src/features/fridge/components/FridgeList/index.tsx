import React from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';

import FridgeItem from '@/features/fridge/components/FridgeItem';
import { styles } from './styles';
import { useAppTranslation } from '@/app/i18n/useAppTranslation';

type FridgeListProps = {
  data: any[];
};

export default function FridgeList({ data }: FridgeListProps) {
  const { t } = useAppTranslation('fridge');

  const renderItem: ListRenderItem<any> = ({ item }) => {
    return <FridgeItem item={item} />;
  };

  const keyExtractor = (item: any) => String(item.id);

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
