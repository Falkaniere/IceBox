import { Text, View } from 'react-native';

import { styles } from './styles';

function FridgeItem({ item }: { item: any }) {
  return (
    <View style={[styles.card, item.expired && styles.expiredCard]}>
      <Text style={styles.itemIcon}>{item.icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={[styles.itemDate, item.expired && styles.expiredText]}>
          {item.expired
            ? `Expired: ${item.expires}`
            : `Expires: ${item.expires}`}
        </Text>
      </View>
      <View style={styles.qtyBadge}>
        <Text style={styles.qtyText}>x{item.qty}</Text>
      </View>
    </View>
  );
}

export default FridgeItem;
