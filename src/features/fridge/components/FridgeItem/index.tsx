import React from 'react';
import { Text, View, Pressable, Alert } from 'react-native';
import { Trash2 } from 'lucide-react-native';

import { formatExpiryLabel } from '@/app/utils/expiry';
import { styles } from './styles';
import { categoryIconMap } from '@/features/fridge/utils/categoryIcon';
import { FridgeItem as FridgeItemType } from '@/features/fridge/model/fridgeItem';
import { useFridge } from '@/features/fridge/providers/FridgeProvider';
import { useAppTranslation } from '@/app/i18n/useAppTranslation';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// function getStatusLabel(status: ExpiryStatus | undefined) {
//   if (status === 'expired') return 'Expired';
//   if (status === 'soon') return 'Expiring soon';
//   return 'Fresh';
// }

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function FridgeItem({
  item,
  onEdit,
}: {
  item: FridgeItemType;
  onEdit: (item: FridgeItemType) => void;
}) {
  const { removeItem } = useFridge();
  const { t } = useAppTranslation('common');

  function handleDelete() {
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);

    Alert.alert(t('confirm_delete_title'), t('confirm_delete_message'), [
      {
        text: t('cancel'),
        style: 'cancel',
      },
      {
        text: t('delete'),
        style: 'destructive',
        onPress: () => {
          ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);

          removeItem(item.id);
        },
      },
    ]);
  }

  const status = item.expirationStatus;

  return (
    <Pressable onPress={() => onEdit(item)}>
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
          onPress={handleDelete}
          style={styles.deleteButtonAbsolute}
          hitSlop={12}
        >
          <Trash2 size={20} color='#6F7E94' />
        </Pressable>
      </View>
    </Pressable>
  );
}
