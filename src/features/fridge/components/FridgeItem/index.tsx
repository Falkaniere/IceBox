import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { Trash2 } from 'lucide-react-native';

import { formatExpiryLabel, ExpiryStatus } from '@/app/utils/expiry';
import { styles } from './styles';
import { categoryIconMap } from '@/features/fridge/utils/categoryIcon';
import { FridgeItem as FridgeItemType } from '@/features/fridge/model/fridgeItem';
import { useFridge } from '@/features/fridge/providers/FridgeProvider';

// function getStatusLabel(status: ExpiryStatus | undefined) {
//   if (status === 'expired') return 'Expired';
//   if (status === 'soon') return 'Expiring soon';
//   return 'Fresh';
// }

export default function FridgeItem({ item }: { item: FridgeItemType }) {
  const { removeItem } = useFridge();
  const status = item.expirationStatus;

  return (
    <View style={styles.card}>
      <Text style={styles.itemIcon}>{categoryIconMap[item.category]}</Text>

      <View style={styles.content}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>

        <Text
          style={[
            styles.itemDate,
            status === 'expired' && styles.itemDateExpired,
            status === 'soon' && styles.itemDateSoon,
          ]}
          numberOfLines={1}
        >
          {formatExpiryLabel(status, item.expiresAt)}
        </Text>
      </View>

      <View style={styles.qtyBadge}>
        <Text style={styles.qtyText}>x{item.qty}</Text>
      </View>

      <Pressable
        onPress={() => removeItem(item.id)}
        style={styles.deleteButtonAbsolute}
        hitSlop={12}
      >
        <Trash2 size={20} color='#6F7E94' />
      </Pressable>
    </View>
  );
}
