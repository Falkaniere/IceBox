import React from 'react';
import { Text, View } from 'react-native';

import { formatExpiryLabel, ExpiryStatus } from '@/app/utils/expiry';
import { styles } from './styles';

type FridgeItemModel = {
  id: string;
  name: string;
  expiresAt: string;
  qty: number;
  icon?: string;
  status: ExpiryStatus;
};

function getStatusLabel(status: ExpiryStatus) {
  if (status === 'expired') return 'Expired';
  if (status === 'soon') return 'Expiring soon';
  return 'Fresh';
}

export default function FridgeItem({ item }: { item: FridgeItemModel }) {
  const status = item.status;

  return (
    <View style={styles.card}>
      <Text style={styles.itemIcon}>{item.icon ?? '🧊'}</Text>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.name}
          </Text>

          <View
            style={[
              styles.statusPill,
              status === 'expired' && styles.statusPillExpired,
              status === 'soon' && styles.statusPillSoon,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                status === 'expired' && styles.statusTextExpired,
                status === 'soon' && styles.statusTextSoon,
              ]}
            >
              {getStatusLabel(status)}
            </Text>
          </View>
        </View>

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
    </View>
  );
}
